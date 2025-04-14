import express from "express";
import { getRoommates } from  "../controllers/getRoommate.js";  // ✅ Correct path
import { getSingleRoommate } from "../controllers/getRoommate.js";
const router = express.Router();

router.get("/getroommates", getRoommates);
router.get("/getroommate/:id", getSingleRoommate);

export default router;
