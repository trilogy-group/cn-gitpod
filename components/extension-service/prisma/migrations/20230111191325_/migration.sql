-- Copyright (c) 2023 Gitpod GmbH. All rights reserved.
-- Licensed under the GNU Affero General Public License (AGPL).
-- See License-AGPL.txt in the project root for license information.

-- CreateTable
CREATE TABLE `WorkspaceInstance` (
    `instanceId` VARCHAR(191) NOT NULL,
    `arch` VARCHAR(191) NOT NULL DEFAULT 'x86',

    PRIMARY KEY (`instanceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
