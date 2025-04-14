import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  userName: {
    type: String,
    required: false,
    default: "88",
  },
  contactNumber: {
    type: String,
    default: false,
  },
  city: {
    type: String,
    default: false,
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
  lookingfor: {
    type: String,
    required: false,
    default: "rented room",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
