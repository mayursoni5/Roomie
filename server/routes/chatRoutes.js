// routes/chatRoutes.js
import express from "express";
import { sendMessage, getMessages } from "../controllers/chatController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/:senderId/:receiverId", getMessages);

export default router;
