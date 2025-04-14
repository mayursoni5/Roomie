import express from "express";
import { 
  createListing, 
  getAllListings, 
  getListingById, 
  updateListing, 
  deleteListing 
} from "../controllers/listingController.js";

import { verifyToken, isOwner } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/alllisting", getAllListings); 
router.get("/:id", getListingById); 
router.put("/:id", verifyToken, isOwner, updateListing); 
router.delete("/:id", verifyToken, isOwner, deleteListing); 

export default router;
