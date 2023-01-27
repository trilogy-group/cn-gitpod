#!/bin/bash

if [[ -z "$1" ]]
then
  echo "Please provide cluster-name as CLI argument"
  exit 1
fi

AWS_ID=$(aws sts get-caller-identity | jq .Account | cut -d "\"" -f 2)

echo "Installing EBS CSI Driver on EKS cluster $1 in Account Id $AWS_ID"
eksctl create iamserviceaccount \
  --name ebs-csi-controller-sa \
  --namespace kube-system \
  --cluster "$1" \
  --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
  --approve \
  --role-only \
  --role-name EBS_DriverRole-"$1"

eksctl create addon --name aws-ebs-csi-driver --cluster "$1" --service-account-role-arn arn:aws:iam::"$AWS_ID":role/EBS_DriverRole-"$1" --force
