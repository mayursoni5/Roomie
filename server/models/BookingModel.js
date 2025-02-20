import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const Booking = mongoose.model("Users", BookingSchema);

export default Booking;
