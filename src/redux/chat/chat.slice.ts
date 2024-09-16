import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, Prettify } from "@/utils/types";
import { fetchMessageByTarget } from "./chat.async";
import MessageService from "@/services/messages";

export interface EChatState {
  messages: Message[];
  token: string;
  someone_typing: boolean;
  qa: {
    question: string | null;
    answer: string | null;
  };
}
const initialState: EChatState = {
  messages: [],
  token: "",
  someone_typing: false,
  qa: {
    question: null,
    answer: null,
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<
        Partial<
          Prettify<Message & { file: string | null; target: string | null }>
        >
      >
    ) => {
      console.log(state, action);
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    connectRoom: (state, action: PayloadAction<{ target: string }>) => {
      console.log(state, action);
    },
    leaveRoom: (state, action: PayloadAction<{ target: string }>) => {
      console.log(state, action);
    },
    assignToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    typing: (state, action: PayloadAction<{ target: string | null }>) => {
      console.log(state, action);
    },
    hideTyping: (state, action: unknown) => {
      console.log(action);
      state.someone_typing = false;
    },
    someoneTyping: (state, action: unknown) => {
      console.log(action);
      state.someone_typing = true;
    },
    addQA: (
      state,
      action: PayloadAction<{ content: string; type: "user" | "ai" | "staff" }>
    ) => {
      switch (action.payload.type) {
        case "user":
          state.qa.question = action.payload.content;
          break;
        case "staff":
          state.qa.answer = action.payload.content;
          break;
      }
      if (state.qa.question && state.qa.answer) {
        MessageService.createConversation({
          body: {
            question: state.qa.question,
            answer: state.qa.answer,
          },
        });
      }
    },
    clearQA: (state) => {
      state.qa = {
        question: null,
        answer: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchMessageByTarget.fulfilled,
      (state, action: PayloadAction<Message[]>) => {
        state.messages = action.payload;
      }
    );
  },
});

export const {
  addMessage,
  receiveMessage,
  connectRoom,
  leaveRoom,
  assignToken,
  typing,
  hideTyping,
  someoneTyping,
  addQA,
  clearQA,
} = chatSlice.actions;

export default chatSlice.reducer;
