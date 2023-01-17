/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import * as Docker from "dockerode";
// * helper function to get the digest of an image from its tag

// 1. docker.io/library/alpine:latest
//      -> docker.io/library/alpine@sha256:25d33b2d291ce47c3e4059589766ed98fadab639577efe5e9c89e4a4b50888fc

// 2. some-internal-registry.customer.com:5000/gitpod/base-image:latest
//      -> some-internal-registry.customer.com:5000/gitpod/base-image@sha256:25d33b2d291ce47c3e4059589766ed98fadab639577efe5e9c89e4a4b50888fc

// 3. alpine:latest
//      -> docker.io/library/alpine@sha256:25d33b2d291ce47c3e4059589766ed98fadab639577efe5e9c89e4a4b50888fc

interface IRefConfigFile {
    file: string;
    context?: string;
}

interface IRef {
    configstring: string;
    configfile?: IRefConfigFile;
}

export const getDigest = (ref?: IRef) => {
    const test = `docker.io/library/alpine:latest`;
    resolveDockerTag(test)
        .then((digest) => {
            console.log({ digest });
        })
        .catch((err) => {
            console.log({ err });
        });
};

const resolveDockerTag = async (tag: string) => {
    // create a new Docker client
    const client = new Docker();

    // check if the tag includes a registry URL, otherwise use the default Docker registry
    let [registry, image] = tag.split("/");
    if (!image) {
        registry = "docker.io";
        image = tag;
    }

    // get the image information from the registry
    // const imageInfo = await client.getImage(`${registry}/${image}`).inspect();
    const imageInfo = await client.getImage(`alpine`).inspect();

    // return the absolute digest form of the tag
    return `${registry}/${image}@${imageInfo.Id}`;
};

getDigest();
