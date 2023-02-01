/**
 * Copyright (c) 2023 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import { PrismaClient } from "@prisma/client";

declare global {
    var prismaClient: PrismaClient | undefined;
}

const prismaClient = global.prismaClient || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.prismaClient = prismaClient;
}

async function connectDB() {
    try {
        await prismaClient.$connect();
        console.log("🚀 Database connected successfully");

        // * fetch workspace instances
        const count = await prismaClient.workspaceInstance.count();
        console.log({ count });
    } catch (error) {
        console.log(error);
        process.exit(1);
    } finally {
        await prismaClient.$disconnect();
    }
}

export { prismaClient, connectDB };
