# Developer Manual

## Development Environment
Do not bother setting up the repo locally unless you really know what you're doing. We **STRONGLY** recommend using a gitpod/devspaces workspace for development

You may use [Mixed Devspaces](https://github.com/bilalafzal-ti/bilalafzal-ti) for the same.

`
NOTE: If you want to run an ARM workspaces, ensure that you use the arm-build branch or a child branch of that branch
`

## Credentials Setup
Set up AWS credentials with access to public.ecr.aws/k1t8c0v2/bilal-cn-gp ECR Registry. If you wish to use a different registry, modify the baseImageRepo variable in the WORKSPACE.yaml file

## Infrastructure Setup
Refer to the [Infra Setup](install/Infra%20Setup.md) Docs

## Application Setup
Refer to the [App Setup](install/App%20Setup.md) Docs
