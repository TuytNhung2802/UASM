import { Namespace } from "socket.io";
import { Socket } from "socket.io-client";
import { MyEventEmitter } from "../../events";
import authServiceClient from "../../services/auth";
import crypto from "crypto";
import { Socket as SocketS } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { verify } from "../../utils/common";
import { User } from "../../utils/types";

const advise = async (io: Namespace, { adviseIo }: { adviseIo: Socket }) => {
  const availableSocket = new Map<
    string,
    SocketS<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  >();

  MyEventEmitter.on(
    "send_back_room_to_know_someone_typing",
    (room: { _id: string }, _, sender) => {
      const me = availableSocket.get(sender);
      if (me) {
        me.broadcast.to(room._id).emit("someone_typing");
      }
    }
  );

  MyEventEmitter.on(
    "send_back_room_to_send_message",
    (room: { _id: string }, extend, sender) => {
      const me = availableSocket.get(sender);
      const targetRoom = io.adapter.rooms.get(room._id);
      let hasAnotherIn = false;
      if (targetRoom) {
        for (const r of [...targetRoom]) {
          if (r !== me?.id) {
            hasAnotherIn = true;
            break;
          }
        }
      }
      MyEventEmitter.emit("save_message", {
        ...extend,
        room: room._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      io.to(room._id).emit("receive_message", extend);
      if (!hasAnotherIn) {
        adviseIo.emit("chat", {
          ...extend,
          room: room._id,
        });
      }
    }
  );

  MyEventEmitter.on(
    "send_back_room_to_connect",
    async (room: { _id: string }, extend, sender) => {
      const me = availableSocket.get(sender);
      if (me) {
        const joinedRooms = [...me?.rooms];
        if (Array.isArray(joinedRooms)) {
          for (const r of joinedRooms) {
            me.broadcast.to(r).emit("someone_leave_out_room", extend);
            me.leave(r);
          }
        }
        me.join(room._id);
      }
    }
  );

  MyEventEmitter.on(
    "send_back_room_to_leave",
    async (room: { _id: string }, extend, sender) => {
      const me = availableSocket.get(sender);
      if (me) {
        me.broadcast.to(room._id).emit("someone_leave_out_room", extend);
        me.leave(room._id);
      }
    }
  );

  MyEventEmitter.on("send_back_rooms", ({ rooms, me }: any) => {
    availableSocket.get(me)?.emit("my_conversations", rooms);
  });

  adviseIo.on("receive_message", ({ content, type, room, sender }) => {
    io.to(room).emit("receive_message", { content, type, room, sender });
  });

  io.on("connection", async (socket) => {
    let user: User | null = null;
    console.log(`${socket.id} connect`);
    const token = socket.handshake.headers.token as string;

    socket.on("assign_socket", async () => {
      try {
        if (token) {
          const _verify = await verify<{
            id: string;
            email: string;
            socket: string;
          }>(token);
          if (_verify) {
            try {
              user = await new Promise((resolve, reject) => {
                authServiceClient.UpdateUser(
                  {
                    id: _verify.id,
                    body: {
                      socket: socket.id,
                    },
                  },
                  (err: any, res: any) => {
                    if (err) {
                      reject("Error");
                    }
                    resolve(res?.user);
                  }
                );
              });
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          try {
            user = await new Promise((resolve, reject) => {
              const random = crypto.randomBytes(10).toString();
              authServiceClient.CreateUser(
                {
                  user: {
                    email: `${random}@gmail.com`,
                    password: "123",
                    fullName: random,
                    socket: socket.id,
                  },
                  role: {
                    name: "quest",
                  },
                },
                (err: any, res: any) => {
                  if (err) {
                    reject("Error");
                  }
                  resolve(res?.user);
                }
              );
            });
            if (user) {
              socket.emit("assign_token", user.token.accessToken);
            }
          } catch (error) {
            console.log(error);
          }
        }
        if (user) {
          availableSocket.set(user?.id, socket);
          MyEventEmitter.emit("my_conversations", { me: user.id });
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("connect_room", async ({ target, roomId, token }) => {
      const _verify = await verify<{
        id: string;
        email: string;
        socket: string;
      }>(token);
      console.log(_verify);
      const me = availableSocket.get(_verify.id);
      if (roomId && me) {
        me.broadcast.to(roomId).emit("someone_connect_to_room", _verify);
      }
      MyEventEmitter.emit("connect_room", {
        sender: _verify.id,
        receiver: target,
        roomId: roomId,
        back: "send_back_room_to_connect",
        extend: _verify,
      });
    });

    socket.on("leave_room", async ({ target, roomId, token }) => {
      const _verify = await verify<{
        id: string;
        email: string;
        socket: string;
      }>(token);
      MyEventEmitter.emit("connect_room", {
        sender: _verify.id,
        receiver: target,
        roomId: roomId,
        back: "send_back_room_to_leave",
        extend: _verify,
      });
    });

    socket.on("typing", async ({ room, target, token }) => {
      const _verify = await verify<{
        id: string;
        email: string;
        socket: string;
      }>(token);
      MyEventEmitter.emit("connect_room", {
        sender: _verify.id,
        receiver: target,
        roomId: room,
        back: "send_back_room_to_know_someone_typing",
      });
    });

    socket.on(
      "chat",
      async ({ type, content, file, room, target, token }: any) => {
        const _verify = await verify<{
          id: string;
          email: string;
          socket: string;
        }>(token);
        MyEventEmitter.emit("connect_room", {
          sender: _verify.id,
          receiver: target,
          roomId: room,
          back: "send_back_room_to_send_message",
          extend: {
            content,
            type,
            room,
            sender: _verify.id,
          },
        });
      }
    );

    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnect`);
      socket.disconnect();
    });
  });
};

export default advise;
