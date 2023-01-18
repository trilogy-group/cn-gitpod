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
    # install docker
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - \
    && echo "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list \
    # end
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/*

EXPOSE 8080



# '--no-log-init': see https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
RUN useradd --no-log-init --create-home --uid 31001 --home-dir /app/ unode
COPY --from=builder /app /app/

WORKDIR /app/node_modules/@cn-gitpod/extension-service
RUN yarn p:generate

USER unode

WORKDIR /app/node_modules/@cn-gitpod/extension-service

ARG __GIT_COMMIT
ARG VERSION

ENV GITPOD_BUILD_GIT_COMMIT=${__GIT_COMMIT}
ENV GITPOD_BUILD_VERSION=${VERSION}

# RUN npx prisma generate

CMD exec yarn start
