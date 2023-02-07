#!/bin/bash
if [[ -z "$1" ]]
then
    echo "Provide namespace as a CLI argument"
    exit 1
fi

bash scripts/modify_yamls.sh "$1"
bash scripts/modify_config.sh "$1"
bash scripts/modify_images.sh "$1"
