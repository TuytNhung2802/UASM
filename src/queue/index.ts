import { Channel, Message } from "amqplib";
import { MyEventEmitter } from "../events";
import { callSendAPI } from "../services/messenger/messenger.util";

const queue = async ({ channel }: { channel: Channel }) => {
  const fileExchange = "file";
  // const messageExchange = "message";
  const admissionExchange = "admission";
  const returnMessageQueue = "return_path";
  const connectRoomQueue = "connect_room_queue";
  const sendBackRoomQueue = "send_back_room_queue";
  const sendBackRoomsQueue = "send_back_rooms_queue";
  const roomQueue = "room_queue";
  const messageQueue = "message_queue";
  const aiQueue = "ai_queue";
  const returnMessage = "return_message_queue";
  const generateSourceFromReportQueue = "generate_source_from_report_queue";
  const storeDocsPineconeQueue = "store_docs_pinecone_queue";

  await channel.assertExchange(fileExchange, "direct");
  await channel.assertExchange(admissionExchange, "direct");
  await channel.assertQueue(returnMessageQueue);

  await channel.assertQueue(connectRoomQueue);
  await channel.assertQueue(sendBackRoomQueue);
  await channel.assertQueue(sendBackRoomsQueue);
  await channel.assertQueue(roomQueue);
  await channel.assertQueue(messageQueue);
  await channel.assertQueue(aiQueue);
  await channel.assertQueue(returnMessage);
  await channel.assertQueue(generateSourceFromReportQueue);
  await channel.assertQueue(storeDocsPineconeQueue);

  MyEventEmitter.on("store_docs_pinecone", () => {
    channel.sendToQueue(storeDocsPineconeQueue, Buffer.from("start"));
  });

  MyEventEmitter.on("generate_source_from_report", () => {
    channel.sendToQueue(generateSourceFromReportQueue, Buffer.from("start"));
  });

  MyEventEmitter.on("upload_file", ({ data, routing }) => {
    channel.publish(fileExchange, routing, data.buffer);
  });

  MyEventEmitter.on(
    "apply_admission",
    ({ form, data }: { form: string; data: Record<string, any> }) => {
      channel.publish(
        admissionExchange,
        "apply",
        Buffer.from(JSON.stringify({ form, data }))
      );
    }
  );

  channel.consume(
    returnMessageQueue,
    (msg) => {
      const content = msg?.content;
      if (content) {
        MyEventEmitter.emit("return_path", { path: content.toString() });
      }
      channel.ack(msg as Message);
    },
    {
      noAck: false,
    }
  );

  channel.consume(
    sendBackRoomQueue,
    (msg) => {
      const content = msg?.content;
      if (content) {
        const { room, back, extend, sender } = JSON.parse(content.toString());
        MyEventEmitter.emit(back, room, extend, sender);
      }
    },
    {
      noAck: true,
    }
  );

  channel.consume(
    sendBackRoomsQueue,
    (msg) => {
      const content = msg?.content;
      if (content) {
        const { rooms, me } = JSON.parse(content.toString());
        MyEventEmitter.emit("send_back_rooms", { rooms, me });
      }
    },
    {
      noAck: true,
    }
  );

  channel.consume(
    returnMessage,
    (msg) => {
      try {
        if (msg?.content) {
          const { result, sender_psid } = JSON.parse(msg.content.toString());
          callSendAPI(sender_psid, { text: result });
        }
      } catch (error) {}
    },
    {
      noAck: true,
    }
  );

  MyEventEmitter.on("connect_room", (data) => {
    channel.sendToQueue(connectRoomQueue, Buffer.from(JSON.stringify(data)));
  });

  MyEventEmitter.on("my_conversations", (data: { me: string }) => {
    channel.sendToQueue(roomQueue, Buffer.from(JSON.stringify(data)));
  });

  MyEventEmitter.on("save_message", (data) => {
    channel.sendToQueue(messageQueue, Buffer.from(JSON.stringify(data)));
  });

  MyEventEmitter.on("chat-from-messenger", (data) => {
    channel.sendToQueue(aiQueue, Buffer.from(JSON.stringify(data)));
  });
};

export default queue;
