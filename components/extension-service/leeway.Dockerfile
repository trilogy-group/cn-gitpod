# Copyright (c) 2020 Gitpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

FROM node:16.13.0-slim as builder

RUN apt-get update && apt-get install -y build-essential python3

COPY components-extension-service--app /installer/

WORKDIR /app
RUN /installer/install.sh

FROM node:16.13.0-slim
ENV NODE_OPTIONS="--unhandled-rejections=warn --max_old_space_size=2048"
# Using ssh-keygen for RSA keypair generation
RUN apt-get update && apt-get install -yq \
        openssh-client \
        procps \
        net-tools \
        nano \
        curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/*

EXPOSE 8080

ENV GITPOD_BUILD_GIT_COMMIT=${__GIT_COMMIT}
ENV GITPOD_BUILD_VERSION=${VERSION}

CMD exec yarn start
