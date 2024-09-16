/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message } from "@/utils/types";
import { request } from "./request";

const searchMessage = async (req: {
  params: { target: string };
  query?: any;
}): Promise<Array<Message>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get(`/message/messages/${req.params.target}`)
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const createConversation = async (req: { body: any }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post(`message/conversations`, req.body)
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const MessageService = {
  searchMessage,
  createConversation,
};

export default MessageService;
