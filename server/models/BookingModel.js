import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true }, // The room being booked
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The person requesting booking
  status: {
    type: String,
    enum: ["pending", "confirmed", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
