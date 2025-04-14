import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import Listing from "../models/ListingModel.js";

import dotenv from "dotenv";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("You are not authenticated!");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid!");

    try {
      const user = await User.findById(payload.userId);
      if (!user) return res.status(404).send("User not found!");

      req.userId = user._id;
      next();
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });
};
export const isOwner = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to modify this listing" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies.jwt; // Get token from cookies

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Find user based on token
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    req.user = user; // Attach user to request
    next(); // Continue to next middleware/route
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export default protect;
