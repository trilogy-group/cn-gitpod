-- Copyright (c) 2023 Gitpod GmbH. All rights reserved.
-- Licensed under the GNU Affero General Public License (AGPL).
-- See License-AGPL.txt in the project root for license information.

/*
  Warnings:

  - You are about to drop the `ImageRefArch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ImageRefArch`;

-- CreateTable
CREATE TABLE `HashArch` (
    `hash` VARCHAR(191) NOT NULL,
    `arch` VARCHAR(191) NULL DEFAULT 'x86',

    PRIMARY KEY (`hash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
