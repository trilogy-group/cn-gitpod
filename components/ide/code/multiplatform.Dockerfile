# Copyright (c) 2020 Gitpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License-AGPL.txt in the project root for license information.
ARG IMAGE_REPO_BASE
ARG VERSION

FROM ${IMAGE_REPO_BASE}/ide/code-base:${VERSION} as base

FROM scratch

# copy static web resources in first layer to serve from blobserve
COPY --from=base --chown=33333:33333 /vscode-web/ /ide/
COPY --from=base --chown=33333:33333 /vscode-reh-linux/ /ide/
COPY --chown=33333:33333 startup.sh supervisor-ide-config.json components-ide-code-codehelper--app/codehelper /ide/

ENV GITPOD_ENV_APPEND_PATH=/ide/bin/remote-cli:

# editor config
ENV GITPOD_ENV_SET_EDITOR=/ide/bin/remote-cli/gitpod-code
ENV GITPOD_ENV_SET_VISUAL="$GITPOD_ENV_SET_EDITOR"
ENV GITPOD_ENV_SET_GP_OPEN_EDITOR="$GITPOD_ENV_SET_EDITOR"
ENV GITPOD_ENV_SET_GIT_EDITOR="$GITPOD_ENV_SET_EDITOR --wait"
ENV GITPOD_ENV_SET_GP_PREVIEW_BROWSER="/ide/bin/remote-cli/gitpod-code --preview"
ENV GITPOD_ENV_SET_GP_EXTERNAL_BROWSER="/ide/bin/remote-cli/gitpod-code --openExternal"
