import * as grpc from "@grpc/grpc-js";
import { PreStartWorkspaceNotifyRequest, PreStartWorkspaceNotifyResponse } from "@cn-gitpod/extension-service-api/lib";

const preStartWorkspaceNotifyHookHandler: grpc.handleUnaryCall<
    PreStartWorkspaceNotifyRequest,
    PreStartWorkspaceNotifyResponse
> = (call, callback) => {
    console.log(`extension-service server: preStartWorkspaceNotifyHookHandler`);
    console.log("preStartWorkspaceNotifyHookHandler", call.request.toObject());

    const response = new PreStartWorkspaceNotifyResponse();
    response.setMessage("This is a custom message from the response");
    callback(null, response);
};

export { preStartWorkspaceNotifyHookHandler };
