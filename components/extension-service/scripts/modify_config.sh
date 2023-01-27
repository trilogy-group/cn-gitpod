#!/bin/bash
if [[ -z "$1" ]]
then
    echo "Provide namespace as a CLI argument"
    exit 1
fi

EXTENSION_SERVICE_DOMAIN=extension-service."$1".svc.cluster.local:8080

kubectl get configmaps -n "$1" server-config -o json | jq '.data' | jq '.["config.json"] | fromjson' | jq '. += {"extensionServiceAddr": "'"$EXTENSION_SERVICE_DOMAIN"'"}' > config.json
kubectl create configmap server-config -n "$1" --from-file=config.json -o yaml --dry-run | kubectl apply -f -

kubectl get configmaps -n "$1" ws-manager -o json | jq '.data' | jq '.["config.json"] | fromjson' | jq '.manager.extService += {"addr": "'"$EXTENSION_SERVICE_DOMAIN"'"}' > config.json
kubectl create configmap ws-manager -n "$1" --from-file=config.json -o yaml --dry-run | kubectl apply -f -

kubectl get configmaps -n "$1" image-builder-mk3-config -o json | jq '.data' | jq '.["image-builder.json"] | fromjson' | jq '.orchestrator.extService += {"addr": "'"$EXTENSION_SERVICE_DOMAIN"'"}' > image-builder.json
kubectl create configmap image-builder-mk3-config -n "$1" --from-file=image-builder.json -o yaml --dry-run | kubectl apply -f -

rm config.json
rm image-builder.json
