#!/bin/bash
# Copyright (c) 2020 Gitpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License-AGPL.txt in the project root for license information.

set -euo pipefail

DOCKER_VERSION=20.10.17
DOCKER_COMPOSE_VERSION=v2.11.1
RUNC_VERSION=v1.1.4
ARCH=$(uname -m)

if [ "$ARCH" == "x86_64" ]; then \
  curl -o docker.tgz      -fsSL https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKER_VERSION}.tgz
  curl -o docker-compose  -fsSL https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64
  curl -o runc            -fsSL https://github.com/opencontainers/runc/releases/download/${RUNC_VERSION}/runc.amd64
else
  curl -o docker.tgz      -fsSL https://download.docker.com/linux/static/stable/aarch64/docker-${DOCKER_VERSION}.tgz
  curl -o docker-compose  -fsSL https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-linux-aarch64
  curl -o runc            -fsSL https://github.com/opencontainers/runc/releases/download/${RUNC_VERSION}/runc.arm64
fi
