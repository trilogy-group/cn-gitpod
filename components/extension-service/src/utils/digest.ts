/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

// * helper function to get the digest of an image from its tag
import { execSync } from "child_process";

export type Arch = "x86" | "arm";
const fixArch = (arch: Arch) => {
    switch (arch) {
        case "x86":
            return "amd64";
        case "arm":
            return "arm64";
        default:
            return arch;
    }
};

const getDigestFromImage = async (image: string, arch: Arch) => {
    const fixedArch = fixArch(arch);
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
    try {
        const response = execSync(command).toString();
        const parsedResponse = JSON.parse(response);

        // ! remove the tag from the image name
        const lastColonIndex = image.lastIndexOf(":");
        image = image.substring(0, lastColonIndex);

        // * if the response has manifests, we have to get the digest from the first element
        if (parsedResponse.manifests) {
            // ! get the digest with the correct arch
            const manifest = parsedResponse.manifests.find(
                (manifest: any) => manifest.platform.architecture === fixedArch,
            );
            const digest = manifest.digest;

            return `${image}@${digest}`;
        }

        // * if the response has config, we have to get the digest from the config object
        if (parsedResponse.config) {
            const digest = parsedResponse.config.digest;

            return `${image}@${digest}`;
        }
    } catch (err) {
        console.error(err);

        return image;
    }

    return image;
};

/**
 * Get the digest for an image with a tag and swap
 * @param image string
 * @returns string
 */
export const swapTagWithDigest = (image: string, arch: Arch) => {
    // TODO: handle all cases

    // ! in case the image name is already a digest, we dont need to do anything
    if (image.includes("@sha256")) {
        return Promise.resolve(image);
    }

    // The image may be what Docker calls a "familiar" name, e.g. ubuntu:latest instead of docker.io/library/ubuntu:latest.
    // To make this a valid digested form we first need to normalize that familiar name.
    // We cant split the image name by ":" because the image name can contain a port number.
    // So we split the image name by the last occurrence of ":".
    const lastColonIndex = image.lastIndexOf(":");
    if (lastColonIndex === -1) {
        // ! no tag found, add latest tag
        image = `${image}:latest`;
    } else if (lastColonIndex === image.length - 1) {
        // ! tag is empty, add latest tag
        image = `${image}latest`;
    }

    // ! now we have a valid image name, we can get the digest
    const digest = getDigestFromImage(image, arch);
    return digest;
};

// console.log(swapTagWithDigest("alpine:latest", "arm"));
