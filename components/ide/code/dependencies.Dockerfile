# Copyright (c) 2022 Gitpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License-AGPL.txt in the project root for license information.

# First part - Reverse engineer of gitpod/openvscode-server-linux-build-agent:centos7-devtoolset8-x64
#
# Derived by running following commands:
#    alias dfimage="docker run -v /var/run/docker.sock:/var/run/docker.sock --rm alpine/dfimage"
#    dfimage -sV=1.36 gitpod/openvscode-server-linux-build-agent:centos7-devtoolset8-x64
#
FROM centos:7

ARG INSTALL_PKGS="devtoolset-8-gcc devtoolset-8-gcc-c++ devtoolset-8-gcc-gfortran devtoolset-8-gdb make git sudo libsecret-devel nodejs python3"
RUN curl --silent --location https://rpm.nodesource.com/setup_16.x | bash - # buildkit
RUN yum install -y centos-release-scl-rh  \
        && yum install -y --setopt=tsflags=nodocs $INSTALL_PKGS  \
        && rpm -V $INSTALL_PKGS  \
        && yum -y clean all --enablerepo='*' # buildkit
RUN npm install -g npm@latest # buildkit
RUN npm install -g yarn # buildkit
ENV PATH=/opt/rh/devtoolset-8/root/usr/bin/:$PATH
RUN mkdir -p /root/vscode # buildkit
WORKDIR /root/vscode

# Second part - From original gitpod leeway.Dockerfile 
ARG CODE_COMMIT

RUN mkdir /gp-code \
    && cd /gp-code \
    && git init \
    && git remote add origin https://github.com/gitpod-io/openvscode-server \
    && git fetch origin $CODE_COMMIT --depth=1 \
    && git reset --hard FETCH_HEAD
WORKDIR /gp-code

# Devspaces hot-patches to vscode source
COPY devspaces.patch .
RUN yum install -y patch
RUN cat devspaces.patch | patch -p1
# End devspaces hot-patches

RUN yarn --cwd remote --frozen-lockfile --network-timeout 180000
