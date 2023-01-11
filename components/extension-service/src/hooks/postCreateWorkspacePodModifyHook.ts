import * as grpc from "@grpc/grpc-js";
import {
    PostCreateWorkspacePodModifyRequest,
    PostCreateWorkspacePodModifyResponse,
} from "@cn-gitpod/extension-service-api/lib";

const postCreateWorkspacePodModifyHookHandler: grpc.handleUnaryCall<
    PostCreateWorkspacePodModifyRequest,
    PostCreateWorkspacePodModifyResponse
> = (call, callback) => {};

export { postCreateWorkspacePodModifyHookHandler };
