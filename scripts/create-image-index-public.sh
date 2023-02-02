#!/bin/bash

if [[ -z "$1" ]]
then
    echo "Please enter component name as first CLI argument"
    exit 1
fi

component="$1"

full_repo=public.ecr.aws/k1t8c0v2/bilal-cn-gp/"$component"
arm_ref="$full_repo":arm64
amd_ref="$full_repo":amd64


docker pull "$arm_ref"
docker pull "$amd_ref"

docker manifest rm "$full_repo"
docker manifest create "$full_repo" "$arm_ref" "$amd_ref" --amend
docker manifest annotate --arch arm64 "$full_repo" "$arm_ref"
docker manifest push "$full_repo"
