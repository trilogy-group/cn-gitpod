/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

// * helper function to get the digest of an image from its tag
import { execSync } from "child_process";

const getDigestFromImage = async (image: string) => {
    // * we have to run the command: docker manifest inspect <image>
    // * example:
    // docker manifest inspect docker.io/library/alpine:latest
    // {
    //   "schemaVersion": 2,
    //   "mediaType": "application/vnd.docker.distribution.manifest.list.v2+json",
    //   "manifests": [
    //     {
    //       "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
    //       "size": 525,
    //       "digest": "sha256:25d33
    //       "platform": {
    //         "architecture": "amd64",
    //         "os": "linux"
    //       }
    //  ],
    // }
    // or the response can have config object instead of manifests
    // {
    //   "schemaVersion": 2,
    //   "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
    //   "config": {
    //     "mediaType": "application/vnd.docker.container.image.v1+json",
    //     "size": 1512,
    //     "digest": "sha256:25d33b
    //   },
    // }

    const command = `docker manifest inspect ${image}`;
    const response = execSync(command).toString();
    const parsedResponse = JSON.parse(response);

    if (!parsedResponse) {
        return;
    }

    // * error handling
    if (parsedResponse.errors) {
        console.log(parsedResponse.errors);
        return;
    }

    // * if the response has manifests, we have to get the digest from the first element
    if (parsedResponse.manifests) {
        const digest = parsedResponse.manifests[0].digest;
        return `${image}@${digest}`;
    }

    // * if the response has config, we have to get the digest from the config object
    if (parsedResponse.config) {
        const digest = parsedResponse.config.digest;
        return `${image}@${digest}`;
    }

    return image;
};

/**
 * Get the digest for an image with a tag and swap
 * @param image string
 * @returns string
 */
export const swapTagWithDigest = (image: string) => {
    // const test = `docker.io/library/alpine:latest`;
    // * we have to fix the image name to be able to get the digest
    // * examples:
    // 1. docker.io/library/alpine:latest
    //      -> docker.io/library/alpine@sha256:25d33b2d291ce47c3e4059589766ed98fadab639577efe5e9c89e4a4b50888fc
    // 2. some-internal-registry.customer.com:5000/gitpod/base-image:latest
    //      -> some-internal-registry.customer.com:5000/gitpod/base-image@sha256:25d33b2d291ce47c3e4059589766ed98fadab639577efe5e9c89e4a4b50888fc
    // 3. alpine:latest
    //      -> docker.io/library/alpine@sha256:25d33b2d291ce47c3e4059589766ed98fadab639577efe5e9c89e4a4b50888fc

    if (image.includes("@")) {
        return image;
    }

    if (!image.includes(":")) {
        image = `${image}:latest`;
    }

    if (!image.includes("/")) {
        image = `docker.io/library/${image}`;
    }

    if (!image.includes(".")) {
        image = `docker.io/${image}`;
    }

    // ! now we have a valid image name, we can get the digest
    return getDigestFromImage(image);
};
