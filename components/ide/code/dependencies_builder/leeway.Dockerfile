# Copyright (c) 2022 Gitpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License-AGPL.txt in the project root for license information.

FROM centos:7

ARG INSTALL_PKGS=devtoolset-8-gcc devtoolset-8-gcc-c++ devtoolset-8-gcc-gfortran devtoolset-8-gdb make git sudo libsecret-devel nodejs python3
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