import Listing from "../models/ListingModel.js";
import mongoose from "mongoose";
import Room from "../models/RoomModel.js";

/**
 * @desc    Create a new listing
 * @route   POST /api/listings
 * @access  Private (Only authenticated users)
 */
export const createListing = async (req, res) => {
  try {
    const { name, location, rent, type, genderPreference, capacity } = req.body;

    const newListing = await Listing.create({
      name,
    
      location,
      rent,
      type,
      genderPreference,
      capacity,
      owner: req.user._id,
    });

    res.status(201).json({ success: true, message: "Listing created", listing: newListing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all listings
 * @route   GET /api/listings
 * @access  Public
 */
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
    res.status(200).json({ success: true, listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get a single listing by ID with populated owner details
 * @route   GET /api/listings/:id
 * @access  Public
 */
export const getListingById = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Listing ID" });
    }

    const listing = await Room.findById(id);

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    res.status(200).json({ success: true, data: listing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update a listing by ID (Only Owner)
 * @route   PUT /api/listings/:id
 * @access  Private (Only listing owner)
 */
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to update this listing" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Listing updated", listing: updatedListing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a listing by ID (Only Owner)
 * @route   DELETE /api/listings/:id
 * @access  Private (Only listing owner)
 */
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this listing" });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
