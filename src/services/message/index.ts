import { ProtoGrpcType } from "../../generated/message";
import { MESSAGE_PROTO_PATH } from "../../protos";
import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const messagePackageDefinition = loadSync(MESSAGE_PROTO_PATH);
const messageService = loadPackageDefinition(
  messagePackageDefinition
) as unknown as ProtoGrpcType;

const messageServiceClient = new messageService.message.Message(
  process.env.MESSAGE_GRPC as string,
  credentials.createInsecure()
);

export default messageServiceClient;
