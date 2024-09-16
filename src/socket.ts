import { io as clientIo } from "socket.io-client";

export const adviseIo = clientIo("http://localhost:4998/advise");
