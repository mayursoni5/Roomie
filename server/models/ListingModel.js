import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  price: Number,
  capacity: Number, // Total number of renters allowed
  currentOccupants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Current renters
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Listing = mongoose.model("Users", ListingSchema);

export default Listing;
