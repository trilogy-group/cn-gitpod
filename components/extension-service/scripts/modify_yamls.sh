#!/bin/bash

if [[ -z "$1" ]]
then
    echo "Provide namespace as a CLI argument"
    exit 1
fi

cd /workspace/gitpod/components/extension-service || exit

kubectl apply -g yamls/secrets.example.yaml
kubectl apply -g yamls/job.yaml

yq w -i yamls/deployment.yaml 'metadata.annotations."meta.helm.sh/release-namespace"' "$1"
yq w -i yamls/deployment.yaml 'metadata.namespace' "$1"
yq w -i yamls/deployment.yaml 'spec.template.namespace' "$1"
yq w -i yamls/deployment.yaml 'spec.template.spec.containers[0].env[1].value' mysql://root:\$\(DB_PASSWORD\)@mysql."$1".svc.cluster.local:3306/extensionservice

kubectl apply -f yamls/deployment.yaml

yq w -i yamls/service.yaml 'metadata.annotations."meta.helm.sh/release-namespace"' "$1"
yq w -i yamls/service.yaml 'metadata.namespace' "$1"

kubectl apply -f yamls/service.yaml
