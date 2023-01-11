-- CreateTable
CREATE TABLE `WorkspaceInstance` (
    `instanceId` VARCHAR(191) NOT NULL,
    `arch` VARCHAR(191) NOT NULL DEFAULT 'x86',

    PRIMARY KEY (`instanceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
