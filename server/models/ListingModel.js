import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true }, // Total number of renters allowed
  currentOccupants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Current renters
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner of the listing
}, { timestamps: true });

const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;

