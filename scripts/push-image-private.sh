#!/bin/bash
component=$1
image_tag=$2

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 346945241475.dkr.ecr.us-east-1.amazonaws.com
leeway build components/"$component":docker -Dversion="$image_tag"
