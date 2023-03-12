#!/bin/bash

if [[ -z "$1" ]]
then
    echo "Provide namespace as a CLI argument"
    exit 1
fi

cd /workspace/gitpod/components/extension-service || exit

yq w -i yamls/secrets.example.yaml 'metadata.annotations."meta.helm.sh/release-namespace"' "$1"
yq w -i yamls/secrets.example.yaml 'metadata.namespace' "$1"
kubectl apply -f yamls/secrets.example.yaml

yq w -i yamls/job.yaml 'metadata.namespace' "$1"
yq w -i yamls/job.yaml 'spec.template.spec.containers[0].env[1].value' mysql://root:\$\(DB_PASSWORD\)@mysql."$1".svc.cluster.local:3306/extensionservice
kubectl apply -f yamls/job.yaml

yq w -i yamls/deployment.yaml 'metadata.annotations."meta.helm.sh/release-namespace"' "$1"
yq w -i yamls/deployment.yaml 'metadata.namespace' "$1"
yq w -i yamls/deployment.yaml 'spec.template.spec.containers[0].env[1].value' mysql://root:\$\(DB_PASSWORD\)@mysql."$1".svc.cluster.local:3306/extensionservice
yq w -i yamls/deployment.yaml 'spec.template.spec.initContainers[0].args[2]' 'until nslookup mysql.'"$1"'.svc.cluster.local; do echo waiting for mysql; sleep 2; done;'
kubectl apply -f yamls/deployment.yaml

yq w -i yamls/service.yaml 'metadata.annotations."meta.helm.sh/release-namespace"' "$1"
yq w -i yamls/service.yaml 'metadata.namespace' "$1"

kubectl apply -f yamls/service.yaml
