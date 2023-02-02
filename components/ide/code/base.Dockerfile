# Copyright (c) 2020 Gitpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License-AGPL.txt in the project root for license information.

# The following has been packed into code-dependencies.
# FROM gitpod/openvscode-server-linux-build-agent:centos7-devtoolset8-x64 as dependencies_builder
# 
# ARG CODE_COMMIT
# 
# RUN mkdir /gp-code \
#     && cd /gp-code \
#     && git init \
#     && git remote add origin https://github.com/gitpod-io/openvscode-server \
#     && git fetch origin $CODE_COMMIT --depth=1 \
#     && git reset --hard FETCH_HEAD
# WORKDIR /gp-code
# 
# # Devspaces hot-patches to vscode source
# RUN sed -i 's/^[ \t]*registerWelcomeWalkthroughCommands/\/\//;s/^[ \t]*startWelcomeWalkthrough/\/\//' extensions/gitpod-web/src/extension.ts
# RUN sed -i "s/'default': 'welcomePage'/'default': 'readme'/" src/vs/workbench/contrib/welcomeGettingStarted/browser/gettingStarted.contribution.ts
# # End devspaces hot-patches
# 
# RUN yarn --cwd remote --frozen-lockfile --network-timeout 180000

ARG IMAGE_REPO_BASE
ARG BASE_VERSION
ARG TARGET_PLATFORM
FROM ${IMAGE_REPO_BASE}/ide/code-dependencies:${BASE_VERSION}-${TARGET_PLATFORM} as dependencies





# The first part is the source of code_builder
# FROM gitpod/openvscode-server-linux-build-agent:bionic-x64 as code_builder
FROM ubuntu:bionic

ARG DEBIAN_FRONTEND=noninteractive
RUN groupadd --gid 1000 builduser  \
    && useradd --uid 1000 --gid builduser --shell /bin/bash --create-home builduser  \
    && mkdir -p /setup # buildkit
ENV TEMP=/tmp
RUN chmod a+rwx /tmp # buildkit
RUN apt-get update  \
    && apt-get install -y software-properties-common # buildkit
RUN add-apt-repository ppa:git-core/ppa -y # buildkit
RUN apt-get update  \
    && apt-get install -y apt-transport-https ca-certificates curl git gnome-keyring iproute2 libfuse2 libgconf-2-4 libgdk-pixbuf2.0-0 libgl1 libgtk-3.0 libsecret-1-dev libssl-dev libx11-dev libx11-xcb-dev libxkbfile-dev locales lsb-release lsof python-dbus python-pip sudo wget xvfb tzdata unzip jq  \
    && curl https://chromium.googlesource.com/chromium/src/+/HEAD/build/install-build-deps.sh\?format\=TEXT | base64 --decode | cat > /setup/install-build-deps.sh  \
    && chmod +x /setup/install-build-deps.sh  \
    && bash /setup/install-build-deps.sh --syms --no-prompt --no-chromeos-fonts --no-arm --no-nacl  \
    && rm -rf /var/lib/apt/lists/* # buildkit
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - # buildkit
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list # buildkit
RUN apt-get update  \
    && apt-get install -y yarn # buildkit
RUN echo 'builduser ALL=NOPASSWD: ALL' >> /etc/sudoers.d/50-builduser  \
    && echo 'Defaults env_keep += "DEBIAN_FRONTEND"' >> /etc/sudoers.d/env_keep # buildkit
RUN wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb # buildkit
RUN dpkg -i packages-microsoft-prod.deb # buildkit
RUN apt-get update  \
    && apt-get install -y dotnet-sdk-2.1 # buildkit
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1 # buildkit
RUN python --version # buildkit
COPY xvfb-init.sh /etc/init.d/
RUN mv /etc/init.d/xvfb-init.sh /etc/init.d/xvfb # buildkit

RUN chmod a+x /etc/init.d/xvfb # buildkit
RUN sudo mkdir -p /var/run/dbus # buildkit
RUN gcc --version # buildkit
RUN g++ --version # buildkit

# The second part is from leeway.Dockerfile
ARG CODE_COMMIT
ARG CODE_QUALITY

ARG NODE_VERSION=16.16.0
ARG NVM_DIR="/root/.nvm"
RUN mkdir -p $NVM_DIR \
    && curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | sh \
    && . $NVM_DIR/nvm.sh \
    && nvm alias default $NODE_VERSION
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV ELECTRON_SKIP_BINARY_DOWNLOAD=1

RUN mkdir /gp-code \
    && cd /gp-code \
    && git init \
    && git remote add origin https://github.com/gitpod-io/openvscode-server \
    && git fetch origin $CODE_COMMIT --depth=1 \
    && git reset --hard FETCH_HEAD
WORKDIR /gp-code

# Devspaces hot-patches to vscode source
COPY devspaces.patch .
RUN cat devspaces.patch | patch -p1
# End devspaces hot-patches

ENV npm_config_arch=x64
RUN yarn --frozen-lockfile --network-timeout 180000

# copy remote dependencies build in dependencies_builder image
RUN rm -rf remote/node_modules/
COPY --from=dependencies /gp-code/remote/node_modules/ /gp-code/remote/node_modules/

# update product.json
RUN nameShort=$(jq --raw-output '.nameShort' product.json) && \
    nameLong=$(jq --raw-output '.nameLong' product.json) && \
    if [ "$CODE_QUALITY" = "insider" ]; then \
        nameShort="$nameShort - Insiders" \
        nameLong="$nameLong - Insiders" \
    ; fi  && \
    setQuality="setpath([\"quality\"]; \"$CODE_QUALITY\")" && \
    setNameShort="setpath([\"nameShort\"]; \"$nameShort\")" && \
    setNameLong="setpath([\"nameLong\"]; \"$nameLong\")" && \
    jqCommands="${setQuality} | ${setNameShort} | ${setNameLong}" && \
    cat product.json | jq "${jqCommands}" > product.json.tmp && \
    mv product.json.tmp product.json && \
    jq '{quality,nameLong,nameShort}' product.json

ARG TARGET_PLATFORM_VSCODE

RUN yarn --cwd extensions compile \
    && yarn gulp vscode-web-min \
    && yarn gulp vscode-reh-linux-${TARGET_PLATFORM_VSCODE}-min

# config for first layer needed by blobserve
# we also remove `static/` from resource urls as that's needed by blobserve,
# this custom urls will be then replaced by blobserve.
# Check pkg/blobserve/blobserve.go, `inlineVars` method
RUN cp /vscode-web/out/vs/gitpod/browser/workbench/workbench.html /vscode-web/index.html \
    && cp /vscode-web/out/vs/gitpod/browser/workbench/callback.html /vscode-web/callback.html \
    && sed -i -e 's#static/##g' /vscode-web/index.html \
    && sed -i -e "s/{{VERSION}}/$CODE_QUALITY-$CODE_COMMIT/g" /vscode-web/index.html

# cli config: alises to gitpod-code
RUN cp /vscode-reh-linux-${TARGET_PLATFORM_VSCODE}/bin/remote-cli/gitpod-code /vscode-reh-linux-${TARGET_PLATFORM_VSCODE}/bin/remote-cli/code \
    && cp /vscode-reh-linux-${TARGET_PLATFORM_VSCODE}/bin/remote-cli/gitpod-code /vscode-reh-linux-${TARGET_PLATFORM_VSCODE}/bin/remote-cli/gp-code \
    && cp /vscode-reh-linux-${TARGET_PLATFORM_VSCODE}/bin/remote-cli/gitpod-code /vscode-reh-linux-${TARGET_PLATFORM_VSCODE}/bin/remote-cli/open

# grant write permissions for built-in extensions
RUN chmod -R ugo+w /vscode-reh-linux-${TARGET_PLATFORM_VSCODE}/extensions

# Move to a platform-independent name
RUN mv /vscode-reh-linux-${TARGET_PLATFORM_VSCODE} /vscode-reh-linux

#FROM scratch
## copy static web resources in first layer to serve from blobserve
#COPY --from=code_builder --chown=33333:33333 /vscode-web/ /ide/
#COPY --from=code_builder --chown=33333:33333 /vscode-reh-linux-x64/ /ide/
#COPY --chown=33333:33333 startup.sh supervisor-ide-config.json components-ide-code-codehelper--app/codehelper /ide/
#
#ENV GITPOD_ENV_APPEND_PATH=/ide/bin/remote-cli:
#
## editor config
#ENV GITPOD_ENV_SET_EDITOR=/ide/bin/remote-cli/gitpod-code
#ENV GITPOD_ENV_SET_VISUAL="$GITPOD_ENV_SET_EDITOR"
#ENV GITPOD_ENV_SET_GP_OPEN_EDITOR="$GITPOD_ENV_SET_EDITOR"
#ENV GITPOD_ENV_SET_GIT_EDITOR="$GITPOD_ENV_SET_EDITOR --wait"
#ENV GITPOD_ENV_SET_GP_PREVIEW_BROWSER="/ide/bin/remote-cli/gitpod-code --preview"
#ENV GITPOD_ENV_SET_GP_EXTERNAL_BROWSER="/ide/bin/remote-cli/gitpod-code --openExternal"
