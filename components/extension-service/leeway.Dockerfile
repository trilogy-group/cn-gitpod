# Copyright (c) 2020 Gitpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License.AGPL.txt in the project root for license information.

FROM node:16.13.0-slim as builder

RUN apt-get update && apt-get install -y build-essential python3

WORKDIR /workspace/gitpod/extension-service

COPY package.json ./

RUN yarn install

COPY components/extension-service .

RUN yarn build

ENV GITPOD_BUILD_GIT_COMMIT=${__GIT_COMMIT}
ENV GITPOD_BUILD_VERSION=${VERSION}

EXPOSE 8080

CMD exec yarn start
