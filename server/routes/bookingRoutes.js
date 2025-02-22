import express from "express";
import {
  requestBooking,
  approveBooking,
  listForRoommates,
  requestRoommateBooking,
  approveRoommate,
} from "../controllers/BookingController.js"
import { protect } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/request", protect, requestBooking); // Seeker requests a booking
router.post("/approve", protect, approveBooking); // Owner approves first booking
router.post("/list-roommates", protect, listForRoommates); // Renter lists for roommates
router.post("/request-roommate", protect, requestRoommateBooking); // Seeker requests roommate spot
router.post("/approve-roommate", protect, approveRoommate); // Current occupant approves roommate

export default router;
