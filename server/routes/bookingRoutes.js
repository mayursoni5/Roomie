import express from "express";
import {
  requestBooking,
  approveBooking,
  listForRoommates,
  requestRoommateBooking,
  approveRoommate,
} from "../controllers/BookingController.js";
import { protect } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/request", protect, requestBooking);
router.post("/approve", protect, approveBooking);
router.post("/list-roommates", protect, listForRoommates);
router.post("/request-roommate", protect, requestRoommateBooking);
router.post("/approve-roommate", protect, approveRoommate);

export default router;
