Commands to reverse-engineer gitpod build docker files to create arm64 versions:

alias dfimage="docker run -v /var/run/docker.sock:/var/run/docker.sock --rm alpine/dfimage"
dfimage -sV=1.36 gitpod/openvscode-server-linux-build-agent:centos7-devtoolset8-x64
dfimage -sV=1.36 gitpod/openvscode-server-linux-build-agent:bionic-x64

How to build:

Build remote on each respective arch

Build yarn --cwd extensions compile \
    && yarn gulp vscode-web-min on x86 