import request from "request";
import { MyEventEmitter } from "../../events";

const PAGE_ACCESS_TOKEN =
  "EAAVwqqnqSUcBO81eXA3u5AGgeo7p2V9URufubyOFWwkglqZCrGbscGKeR43xNXiv0JrNxb5XDjZBTUkDiOJnijDXngVtmHRZAjkPX7QdydhN1qKtu8u3lmdbCawQPZCRsWsXEwbIxtBNn4X1tfRghj3C884wwndoIyrm7vdaB4zUmu31pzGDKIMDqz6OEhnQ";
// Handles messages events
export function handleMessage(sender_psid: string, received_message: any) {
  // Check if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message
    MyEventEmitter.emit("chat-from-messenger", {
      sender_psid,
      message: received_message.text,
    });
  }

  // Sends the response message
  // callSendAPI(sender_psid, {text: ''});
}

// Handles messaging_postbacks events
export function handlePostback(sender_psid: string, received_message: any) {}

// Sends response messages via the Send API
export function callSendAPI(sender_psid: string, response: any) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };
  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}
