# Copyright (c) 2022 Gitpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License-AGPL.txt in the project root for license information.

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
COPY xvfb-init.sh /etc/init.d/xvfb # buildkit

RUN chmod a+x /etc/init.d/xvfb # buildkit
RUN sudo mkdir -p /var/run/dbus # buildkit
RUN gcc --version # buildkit
RUN g++ --version # buildkit