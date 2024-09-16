import { Request, Response } from "express";
import request from "request";
import { handleMessage } from "./messenger.util";

const VERIFY_TOKEN = "levietanh";

const handleEvent = (request: Request, response: Response) => {
  let body = request.body;

  console.log(`\u{1F7EA} Received webhook:`);
  console.dir(body, { depth: null });
  // Send a 200 OK response if this is a page webhook

  if (body.object === "page") {
    // Returns a '200 OK' response to all requests
    body.entry.forEach((entry: any) => {
      // Get the webhook event. entry.messaging is an array, but
      // will only ever contain one event, so we get index 0
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        // handlePostback(sender_psid, webhook_event.postback);
      }
    });
    response.status(200).send("EVENT_RECEIVED");
    // Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    response.sendStatus(404);
  }
};

const verifyWebhookValidity = (req: Request, res: Response) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

const messengerController = {
  handleEvent,
  verifyWebhookValidity,
};

export default messengerController;
