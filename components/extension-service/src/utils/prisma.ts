import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

async function connectDB() {
    try {
        await prisma.$connect();
        console.log("🚀 Database connected successfully");

        // * fetch workspace instances
        const count = await prisma.workspaceInstance.count();
        console.log({ count });
    } catch (error) {
        console.log(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

export { connectDB };
