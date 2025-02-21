
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import Listing from "../models/ListingModel.js"

// ✅ Middleware to verify JWT token
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("You are not authenticated!");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).send("Token is not valid!");

    try {
      const user = await User.findById(payload.userId);
      if (!user) return res.status(404).send("User not found!");

      req.user = user; // ✅ Attach user data to request
      next();
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });
};

// ✅ Middleware to check if logged-in user is the owner of the listing
export const isOwner = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // ❌ If the logged-in user is NOT the owner, deny access
    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to modify this listing" });
    }

    next(); // ✅ Allow request to proceed
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
