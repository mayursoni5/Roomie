// import mongoose from "mongoose";

// const ListingSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   location: { type: String, required: true },
//   price: { type: Number, required: true },
//   capacity: { type: Number, required: true }, // Total number of renters allowed
//   currentOccupants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Current renters
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner of the listing
// }, { timestamps: true });

// const Listing = mongoose.model("Listing", ListingSchema);

// export default Listing;


import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  location: { type: String, required: true },
  rent: { type: Number, required: true },

  // Type of listing: Looking for a Room or a Roommate
  type: { 
    type: String, 
    enum: ["room", "roomie"], 
    required: true 
  },

  // Gender preference of the person posting
  genderPreference: { 
    type: String, 
    enum: ["Male", "Female", "Any"], 
    default: "Any" 
  },



  capacity: { type: Number, required: true },

  currentOccupants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, 
{ timestamps: true });

const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;

