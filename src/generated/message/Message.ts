// Original file: message/message.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Conversation as _message_Conversation, Conversation__Output as _message_Conversation__Output } from '../message/Conversation';
import type { MessageR as _message_MessageR, MessageR__Output as _message_MessageR__Output } from '../message/MessageR';
import type { MessagesResponse as _message_MessagesResponse, MessagesResponse__Output as _message_MessagesResponse__Output } from '../message/MessagesResponse';
import type { Target as _message_Target, Target__Output as _message_Target__Output } from '../message/Target';

export interface MessageClient extends grpc.Client {
  CreateConversation(argument: _message_Conversation, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_message_MessageR__Output>): grpc.ClientUnaryCall;
  CreateConversation(argument: _message_Conversation, metadata: grpc.Metadata, callback: grpc.requestCallback<_message_MessageR__Output>): grpc.ClientUnaryCall;
  CreateConversation(argument: _message_Conversation, options: grpc.CallOptions, callback: grpc.requestCallback<_message_MessageR__Output>): grpc.ClientUnaryCall;
  CreateConversation(argument: _message_Conversation, callback: grpc.requestCallback<_message_MessageR__Output>): grpc.ClientUnaryCall;
  createConversation(argument: _message_Conversation, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_message_MessageR__Output>): grpc.ClientUnaryCall;
  createConversation(argument: _message_Conversation, metadata: grpc.Metadata, callback: grpc.requestCallback<_message_MessageR__Output>): grpc.ClientUnaryCall;
  createConversation(argument: _message_Conversation, options: grpc.CallOptions, callback: grpc.requestCallback<_message_MessageR__Output>): grpc.ClientUnaryCall;
  createConversation(argument: _message_Conversation, callback: grpc.requestCallback<_message_MessageR__Output>): grpc.ClientUnaryCall;
  
  GetMessages(argument: _message_Target, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_message_MessagesResponse__Output>): grpc.ClientUnaryCall;
  GetMessages(argument: _message_Target, metadata: grpc.Metadata, callback: grpc.requestCallback<_message_MessagesResponse__Output>): grpc.ClientUnaryCall;
  GetMessages(argument: _message_Target, options: grpc.CallOptions, callback: grpc.requestCallback<_message_MessagesResponse__Output>): grpc.ClientUnaryCall;
  GetMessages(argument: _message_Target, callback: grpc.requestCallback<_message_MessagesResponse__Output>): grpc.ClientUnaryCall;
  getMessages(argument: _message_Target, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_message_MessagesResponse__Output>): grpc.ClientUnaryCall;
  getMessages(argument: _message_Target, metadata: grpc.Metadata, callback: grpc.requestCallback<_message_MessagesResponse__Output>): grpc.ClientUnaryCall;
  getMessages(argument: _message_Target, options: grpc.CallOptions, callback: grpc.requestCallback<_message_MessagesResponse__Output>): grpc.ClientUnaryCall;
  getMessages(argument: _message_Target, callback: grpc.requestCallback<_message_MessagesResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface MessageHandlers extends grpc.UntypedServiceImplementation {
  CreateConversation: grpc.handleUnaryCall<_message_Conversation__Output, _message_MessageR>;
  
  GetMessages: grpc.handleUnaryCall<_message_Target__Output, _message_MessagesResponse>;
  
}

export interface MessageDefinition extends grpc.ServiceDefinition {
  CreateConversation: MethodDefinition<_message_Conversation, _message_MessageR, _message_Conversation__Output, _message_MessageR__Output>
  GetMessages: MethodDefinition<_message_Target, _message_MessagesResponse, _message_Target__Output, _message_MessagesResponse__Output>
}
