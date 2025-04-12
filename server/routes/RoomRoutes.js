import { Router } from "express";
import { createRoom, getAllRooms } from "../controllers/RoomController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const roomRoutes = Router();

roomRoutes.post("/create", verifyToken, createRoom);
roomRoutes.get("/", getAllRooms);

export default roomRoutes;
