import * as grpc from "@grpc/grpc-js";
import { ExtensionServiceService } from "@cn-gitpod/extension-service/lib";
const server = new grpc.Server();

// * adding services
server.addService(ExtensionServiceService, {});

server.bindAsync("0.0.0.0:8080", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(err);
        return;
    }
    server.start();
    console.log(`🚀 Server listening on ${port}`);
});
