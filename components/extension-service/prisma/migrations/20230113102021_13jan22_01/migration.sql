-- Copyright (c) 2023 Gitpod GmbH. All rights reserved.
-- Licensed under the GNU Affero General Public License (AGPL).
-- See License-AGPL.txt in the project root for license information.

/*
  Warnings:

  - You are about to drop the column `buildId` on the `WorkspaceInstance` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceImageRef` on the `WorkspaceInstance` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `WorkspaceInstance_workspaceImageRef_buildId_idx` ON `WorkspaceInstance`;

-- AlterTable
ALTER TABLE `WorkspaceInstance` DROP COLUMN `buildId`,
    DROP COLUMN `workspaceImageRef`;

-- CreateTable
CREATE TABLE `ImageRefArch` (
    `workspaceImageRef` VARCHAR(191) NOT NULL,
    `arch` VARCHAR(191) NULL DEFAULT 'x86',

    PRIMARY KEY (`workspaceImageRef`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
