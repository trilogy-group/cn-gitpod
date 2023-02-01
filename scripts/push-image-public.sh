#!/bin/bash
component=$1
image_tag=$2
commit_id=$3

aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/k1t8c0v2
leeway build components/"$component":docker -Dversion="$image_tag" -D__git_commit="$commit_id"
