#!/bin/bash
if [[ -z "$1" ]]
then
    echo "Provide namespace as a CLI argument"
    exit 1
fi
SERVER_REPO="gitpod-infra-test/server"
MANAGER_REPO="gitpod-infra-test/ws-manager"
BUILDER_REPO="gitpod-infra-test/image-builder-mk3"

SERVER_IMAGE_TAG=$(aws ecr describe-images --repository-name "$SERVER_REPO" --query "reverse(sort_by(imageDetails, &imagePushedAt))[:1]" | jq '.[]|.imageTags|.[]|select(contains("commit"))' | cut -d "\"" -f 2)
MANAGER_IMAGE_TAG=$(aws ecr describe-images --repository-name "$MANAGER_REPO" --query "reverse(sort_by(imageDetails, &imagePushedAt))[:1]" | jq '.[]|.imageTags|.[]|select(contains("commit"))' | cut -d "\"" -f 2)
BUILDER_IMAGE_TAG=$(aws ecr describe-images --repository-name "$BUILDER_REPO" --query "reverse(sort_by(imageDetails, &imagePushedAt))[:1]" | jq '.[]|.imageTags|.[]|select(contains("commit"))' | cut -d "\"" -f 2)

kubectl set image -n "$1" deployment/server server=346945241475.dkr.ecr.us-east-1.amazonaws.com/"$SERVER_REPO":"$SERVER_IMAGE_TAG"
kubectl set image -n "$1" deployment/ws-manager ws-manager=346945241475.dkr.ecr.us-east-1.amazonaws.com/"$MANAGER_REPO":"$MANAGER_IMAGE_TAG"
kubectl set image -n "$1" deployment/image-builder-mk3 image-builder-mk3=346945241475.dkr.ecr.us-east-1.amazonaws.com/"$BUILDER_REPO":"$BUILDER_IMAGE_TAG"
