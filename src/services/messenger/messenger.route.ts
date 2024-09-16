import { Router } from "express";
import messengerController from "./messenger.controller";

const router = Router();

router.post("/", messengerController.handleEvent);
router.get("/", messengerController.verifyWebhookValidity);

export default router;
