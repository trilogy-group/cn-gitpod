/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

// * helper function to get the digest of an image from its tag
// import { execSync } from "child_process";
import axios from "axios";
import { IMAGE_ARCH_MISMATCH_ERROR } from "./constants";

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

type ImageResponse = {
    architecture: string;
    features: string | null;
    variant: string | null;
    digest: string;
    layers: string[];
    os: string;
    os_features: string | null;
    os_version: string | null;
    size: number;
    status: string;
    last_pulled: string;
    last_pushed: string;
};

const generateAuthToken = async () => {
    // ! request to url: https://hub.docker.com/v2/users/login
    // ! with body: {"username": "gitpod", "password": "gitpod"}
    // ! to get the token
    const url = "https://hub.docker.com/v2/users/login";
    const body = {
        username: process.env?.DOCKERHUB_USER!,
        password: process.env?.DOCKERHUB_PASSWORD!,
    };
    const response: {
        data: {
            token: string;
        };
    } = await axios.post(url, body);
    const token = response.data.token;
    return token;
};
/**
 * Since the above function uses docker CLI, we run into rate limit issues.
 * So we use the image API to get the digest.
 * @param image String
 * @param arch "arm" | "x86"
 */
const getDigestFromImageAPI = async (image: string, arch: Arch) => {
    const fixedArch = fixArch(arch);

    console.log(`Fixed arch: `, arch);

    // * the api we are gonna use is:
    // https://hub.docker.com/v2/repositories/<image>/tags/<tag>

    // * get the imagename and tag from the image
    const lastColonIndex = image.lastIndexOf(":");
    const imageName = image.substring(0, lastColonIndex);
    const tag = image.substring(lastColonIndex + 1);

    let fixedImageName = imageName;

    // * in case the imageName does not contain a "/", we add "library" as default
    if (!imageName.includes("/")) {
        fixedImageName = `library/${fixedImageName}`;
    } else if (imageName.includes("docker.io")) {
        // * in case the imageName contains "docker.io", we remove it
        fixedImageName = imageName.replace("docker.io/", "");
        if (!fixedImageName.includes("/")) {
            fixedImageName = `library/${fixedImageName}`;
        }
    }

    console.log(`FixedImageName & tag: `, {
        fixedImageName,
        tag,
    });

    // * now we have a valid imageName and tag, we can get the digest
    try {
        const token = await generateAuthToken();
        const url = `https://hub.docker.com/v2/repositories/${fixedImageName}/tags/${tag}/images`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // ! get the digest with the correct arch
        if (!response.data) {
            throw new Error("No data returned from docker api");
        }
        const imageResponse: ImageResponse = response.data.find(
            (image: ImageResponse) => image.architecture === fixedArch,
        );
        if (!imageResponse) {
            console.log(`No arch found in docker api response`);
            throw new Error(IMAGE_ARCH_MISMATCH_ERROR);
        }
        const digest = imageResponse.digest;
        return `${imageName}@${digest}`;
    } catch (err) {
        // * in case of DS: Image arch mismatch, we want to throw the error
        if (err?.message === IMAGE_ARCH_MISMATCH_ERROR) {
            throw err;
        }
        console.log(`Got error from docker API: `, err?.message);
        return `${imageName}:${tag}`;
    }
};

/**
 * Get the digest for an image with a tag and swap
 * @param image string
 * @param arch: "x86" | "arm"
 * @returns string
 */
export const swapTagWithDigest = async (image: string, arch: Arch) => {
    // TODO: handle all cases

    // ! in case the image name is already a digest, we dont need to do anything
    if (image.includes("@sha256")) {
        return image;
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

    // * now we have a valid image name, we can get the digest
    const digest = await getDigestFromImageAPI(image, arch);
    return digest;
};
