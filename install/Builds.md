# Builds

This doc instructs on how to run builds for docker images required in the deployments of KOTS apps
## Auth with ECR
1. Set-up AWS credentials in the environment variables
2. Run
```
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws
```

## AMD64 only builds
Run the following command

```bash
leeway build install/installer:docker -Dversion=latest
```

## Cross Architecture Builds
The following components need cross architecture (AMD64 as well as ARM64 builds)
- registry-facade
- ca-updater
- ws-daemon
- seccomp-profiler-installer
- shiftfs-module-loader
- supervisor
- image-builder-bob
- workspacekit
- ide/code

### AMD64 builds
Run the following commands

```bash
leeway build components/registry-facade:docker -Dversion=amd64
leeway build components/registry-facade/ca-updater:docker -Dversion=amd64
leeway build components/ws-daemon:docker -Dversion=amd64
leeway build components/ws-daemon/seccomp-profiler-installer:docker -Dversion=amd64
leeway build components/ws-daemon/shiftfs-module-loader:docker -Dversion=amd64
leeway build components/supervisor:docker -Dversion=amd64
leeway build components/workspacekit:docker -Dversion=amd64
leeway build components/ide/code:docker -Dversion=amd64
```

### ARM64 builds
1. Open a workspace in trilogy.devspaces.com on the arm-build branch of cn-gitpod
2. Set-up AWS credentials in the environment variables
3. Run
```
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws
```
4. Run the following commands
```bash
leeway build components/registry-facade:docker -Dversion=arm64 -D__git_commit=\<current commit-sha\>
leeway build components/registry-facade/ca-updater:docker -Dversion=arm64 -D__git_commit=\<current commit-sha\>
leeway build components/ws-daemon:docker -Dversion=arm64 -D__git_commit=\<current commit-sha\>
leeway build components/ws-daemon/seccomp-profiler-installer:docker -Dversion=arm64 -D__git_commit=\<current commit-sha\>
leeway build components/ws-daemon/shiftfs-module-loader:docker -Dversion=arm64 -D__git_commit=\<current commit-sha\>
leeway build components/supervisor:docker -Dversion=arm64 -D__git_commit=\<current commit-sha\>
leeway build components/workspacekit:docker -Dversion=arm64 -D__git_commit=\<current commit-sha\>
```

### IDE Code build
Due to the fact that IDE Code dockerfile uses x86 only docker images as base, it cannot be built on trilogy devspaces. So, open a workspace on gitpod-infra-dev on the stable 2022 branch & run the following
To build arm64 image for ide/code
1. cd into `components/ide/code/codehelper`
2. Modify BUILD.yaml to add `GOOARCH=arm64` to env
3. run
```bash
leeway build components/ide/code/codehelper:app
```
4. cd into `var/tmp/build`
5. There should be a folder with the prefix `components-ide-code-codehelper--app.` along with a sha suffic=x
6. Run
```
mkdir components-ide-code-codehelper--app
```
7. Copy the contents of the original folder to the newly created folder
Eg.
```bash
cp -r components-ide-code-codehelper--app.5354467d8c78c0fbfcc12545e2fb154363a44dcc/* components-ide-code-codehelper--app/.
```
8. Not the values of codeVersion, codeQuality and codeCommit in the WORKSPACE.yaml and set them as environment variables CODE_VERSION, CODE_QUALITY & CODE_COMMIT respectively
9. Run
```bash
docker buildx build --platform linux/arm64 --build-arg CODE_VERSION=$CODE_VERSION --build-arg CODE_QUALITY=$CODE_QUALITY --build-arg CODE_COMMIT=$CODE_COMMIT -f /workspace/gitpod/components/ide/code/leeway.Dockerfile -t public.ecr.aws/k1t8c0v2/bilal-cn-gp/ide/code:arm64
```

### Creating Manifests
For each fo the cross architecture builds, pull the amd64 and arm64 images on the same machine and run the following steps
```bash
docker manifest create public.ecr.aws/k1t8c0v2/bilal-cn-gp/\<component name\> public.ecr.aws/k1t8c0v2/bilal-cn-gp/\<component name\>:amd64 public.ecr.aws/k1t8c0v2/bilal-cn-gp/\<component name\>:arm64

docker manifest annotate --arch arm64 public.ecr.aws/k1t8c0v2/bilal-cn-gp/\<component name\>:arm64

docker manifest push public.ecr.aws/k1t8c0v2/bilal-cn-gp/\<component name\>
```
