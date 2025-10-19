import express from "express";
import { sendMessage, getChatListReceiver, markMessagesAsRead } from '../controllers/chatController.js';

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getChatListReceiver", getChatListReceiver);
router.post("/markAsRead", markMessagesAsRead);



export default router;
