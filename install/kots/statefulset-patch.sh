#!/bin/bash
# Copyright (c) 2023 Gitpod GmbH. All rights reserved.
# Licensed under the MIT License. See License-MIT.txt in the project root for license information.


if [[ -z "$1" ]]
then
    echo "provide k8s namespace as an argument"
fi

kubectl set image -n "$1" statefulset/mysql mysql=docker.io/bitnami/mysql:5.7.34-debian-10-r55
kubectl set image -n "$1" statefulset/mysql volume-permissions=docker.io/bitnami/bitnami-shell:11-debian-11-r70
kubectl set image -n "$1" statefulset/messagebus rabbitmq=docker.io/bitnami/rabbitmq:3.11.6-debian-11-r0
