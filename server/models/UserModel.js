import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  role: {
    type: String,
    enum: ["seeker", "owner"],
  },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
  profilePicture: {
    type: String,
  },
  profileSetup: {
    type: Boolean,
    default: false,
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
