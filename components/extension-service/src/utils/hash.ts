/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */
import * as crypto from "crypto";
import { BuildRequest, BuildSourceDockerfile,  } from "@cn-gitpod/extension-service-api/lib";

// ! utility function to calculate hash that mimics the gitpod's functionality. To be used in hookpoints 2, 3.
interface IFile {
    source: {
        spec: {
            git: {
                remote_uri?: string;
                clone_target?: string;
            };
        };
    };
    dockerfile_version: string;
    dockerfile_path: string;
    context_path: string;
}

interface IHashManifest {
    DockerfilePath: string;
    DockerfileVersion: string;
    ContextPath: string;
    Source?: string;
    CloneTarget?: string;
    RemoteURI?: string;
}

/**
 * Mimic the gitpod's hash as done in orchestrator.go (getBaseImageRef)
 * @param file IFile
 * @returns string
 */
const calculateHash = (file: IFile) => {
    let manifest: IHashManifest = {
        DockerfilePath: file.dockerfile_path,
        DockerfileVersion: file.dockerfile_version,
        ContextPath: file.context_path,
    };

    if (file.source.spec.git) {
        manifest["Source"] = "git";
        manifest["CloneTarget"] = file.source.spec.git.clone_target;
        manifest["RemoteURI"] = file.source.spec.git.remote_uri;
    }

    const keys = Object.keys(manifest) as (keyof IHashManifest)[];
    keys.sort();
    let dfl = "";
    for (let i = 0; i < keys.length; i++) {
        dfl += `${keys[i]}: ${manifest[keys[i]]}`;
    }

    const hash = crypto.createHash("sha256");
    hash.update(dfl);
    hash.update("\n");

    return hash.digest("hex");
};

// transform the input to required format
const getHashInput = (file: BuildSourceDockerfile | undefined) => {
    return {
        dockerfile_path: file?.getDockerfilePath()!,
        dockerfile_version: file?.getDockerfileVersion()!,
        context_path: file?.getContextPath()!,
        source: {
            spec: {
                git: {
                    remote_uri: file?.getSource()?.getGit()?.getRemoteUri(),
                    clone_target: file?.getSource()?.getGit()?.getCloneTarget(),
                },
            },
        },
    };
};

// ! main function to be used in hookpoint 2 & 3
export const getPayloadHash = (buildRequest: BuildRequest | undefined) => {
    let hash = ``;
    // only compute hash for this case:
    if (buildRequest?.getSource()?.hasFile()) {
        const file = buildRequest?.getSource()?.getFile();
        // ! now we need to find the hash
        const hashInput = getHashInput(file);
        hash = calculateHash(hashInput);
    } else if (buildRequest?.getSource()?.hasRef()) {
        // ! in this case we can simply store the ref as hash
        hash = buildRequest?.getSource()?.getRef()?.getRef()!;
    }

    return hash;
};

//  console.log(
//      calculateHash({
//          source: {
//              spec: {
//                  git: {
//                      remote_uri: "randomuri",
//                      clone_target: "randomtarget",
//                  },
//              },
//          },
//          dockerfile_version: "1",
//          dockerfile_path: "Dockerfile",
//          context_path: ".",
//      }),
//  );
