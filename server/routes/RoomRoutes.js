import { Router } from "express";
import { createRoom, getAllRooms, getRoomById } from "../controllers/RoomController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const roomRoutes = Router();

roomRoutes.get("/", getAllRooms);
roomRoutes.post("/create", verifyToken, createRoom);
roomRoutes.get("/:id", getRoomById);

export default roomRoutes;
