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

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 346945241475.dkr.ecr.us-east-1.amazonaws.com
leeway build components/"$component":docker -Dversion="$image_tag"
