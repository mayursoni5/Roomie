import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required: [true, "Room title is required"],
    },
    title: {
      type: String,
      required: [true, "Room title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    rent: {
      type: Number,
      required: [true, "Rent amount is required"],
    },
    furnished: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
