#!/bin/bash

if [[ -z "$1" ]]
then
    echo "Please enter component name as first CLI argument"
    exit 1
fi

if [[ -z "$2" ]]
then
    echo "Please provide image-tag as second CLI argument"
    exit 1
fi

component="$1"
image_tag="$2"
commit_id=$(git rev-parse HEAD)

aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/k1t8c0v2
leeway build components/"$component":docker -Dversion="$image_tag" -D__git_commit="$commit_id"
