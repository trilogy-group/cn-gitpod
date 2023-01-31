#!/bin/bash
# Copyright (c) 2023 Gitpod GmbH. All rights reserved.
# Licensed under the MIT License. See License-MIT.txt in the project root for license information.


if [[ -z "$1" ]]
then
  echo "Please provide cluster-name as CLI argument"
  exit 1
fi

REPLICATED_APP_SUFFIX=$(echo $RANDOM | md5sum | head -c 7; echo;)
export REPLICATED_APP="$1"-"$REPLICATED_APP_SUFFIX"

aws eks update-kubeconfig --name "$1" --region us-east-1
replicated app create "$REPLICATED_APP"

make helm
make create_unstable_release

replicated customer create --name Community --expires-in "240h" --channel Unstable
export LICENSE_FILE=~/Community-${REPLICATED_APP}-license.yaml
replicated customer download-license --customer Community > "${LICENSE_FILE}"

curl -sSL https://kots.io/install | bash

kubectl kots install "${REPLICATED_APP}" \
--license-file "${LICENSE_FILE}" \
--shared-password 12345678
