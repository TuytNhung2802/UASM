import { Router } from "express";
import messageController from "./message.controller";

const router = Router();

router.get("/messages/:id", messageController.getMessages);
router.post("/conversations", messageController.createConversation);

export default router;
