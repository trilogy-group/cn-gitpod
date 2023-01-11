/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import * as grpc from "@grpc/grpc-js";
import { ExtensionServiceService } from "@cn-gitpod/extension-service-api/lib";

const prisma = require("./utils/prisma");
const hooks = require("./hooks");

const server = new grpc.Server();

// * adding services
server.addService(ExtensionServiceService, {
    preStartWorkspaceNotifyHook: hooks.preStartWorkspaceNotifyHookHandler,
    postCreateWorkspacePodModifyHook: hooks.postCreateWorkspacePodModifyHookHandler,
});

server.bindAsync("0.0.0.0:8080", grpc.ServerCredentials.createInsecure(), async (err, port) => {
    if (err) {
        console.error(err);
        return;
    }
    await prisma.connectDB();
    server.start();
    console.log(`🚀 Server listening on ${port}`);
});
