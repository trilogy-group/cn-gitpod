/**
 * Copyright (c) 2022 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License.AGPL.txt in the project root for license information.
 */

import { CommitContext, ImageConfigString, User, WorkspaceConfig } from "@gitpod/gitpod-protocol";
import { TraceContext } from "@gitpod/gitpod-protocol/lib/util/tracing";
import { ImageSourceProvider } from "./image-source-provider";

export function ec2ImageSource(target: ImageSourceProvider, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;

    descriptor.value = async function (ctx: TraceContext, user: User, context: CommitContext, config: WorkspaceConfig) {
        if (config.image && ImageConfigString.is(config.image) && config.image.startsWith("windows")) {
            return { baseImageResolved: config.image };
        } else {
            return await originalValue(ctx, user, context, config);
        }
    };
}
