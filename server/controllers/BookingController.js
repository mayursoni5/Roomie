import Booking from "../models/BookingModel.js";
import Listing from "../models/ListingModel.js";

// 🟢 (1) New renter requests a booking (Owner approves)
export const requestBooking = async (req, res) => {
  try {
    const { listingId } = req.body;
    const userId = req.user._id;

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

    // Check if user already requested
    const existingBooking = await Booking.findOne({ listing: listingId, user: userId });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: "You already requested this listing" });
    }

    // Create booking request
    const booking = await Booking.create({ listing: listingId, user: userId, status: "pending" });

    return res.status(201).json({ success: true, message: "Booking request sent", data: booking });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 (2) Owner approves the initial booking (First renter)

export const approveBooking = async (req, res) => {
    try {
      const { bookingId } = req.body;
      const booking = await Booking.findById(bookingId).populate("listing");
      
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }
  
      const listing = await Listing.findById(booking.listing._id);
      if (!listing) {
        return res.status(404).json({ success: false, message: "Listing not found" });
      }
  
      // ✅ Only owner can approve the first renter
      if (req.user._id.toString() !== listing.owner.toString()) {
        return res.status(403).json({ success: false, message: "Only owner can approve the first booking." });
      }
  
      // ✅ Add renter to listing
      listing.currentOccupants.push(booking.user);
      
      // ✅ Make listing available for roommates
      listing.isAvailableForRoommates = true; 
  
      await listing.save();
  
      booking.status = "confirmed";
      await booking.save();
  
      return res.status(200).json({ success: true, message: "Booking approved, listing is now open for roommates", data: booking });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// 🟢 (3) Current occupant lists for roommates
export const listForRoommates = async (req, res) => {
  try {
    const { listingId } = req.body;
    const userId = req.user._id;

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

    if (!listing.currentOccupants.includes(userId)) {
      return res.status(403).json({ success: false, message: "Only current occupants can list for roommates." });
    }

    listing.isAvailableForRoommates = true;
    await listing.save();

    return res.status(200).json({ success: true, message: "Listing is now available for roommates", data: listing });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 (4) Seeker requests to be a roommate
export const requestRoommateBooking = async (req, res) => {
    try {
      const { listingId } = req.body;
      const userId = req.user._id;
  
      const listing = await Listing.findById(listingId);
  
      if (!listing) {
        return res.status(404).json({ success: false, message: "Listing not found." });
      }
  
      // Ensure listing is available for roommates
    //   if (listing.isAvailableForRoommates !== true) {
    //     return res.status(400).json({ success: false, message: "This listing is not available for roommates at the moment." });
    //   }
  
      // Check if user already requested to join
      const existingBooking = await Booking.findOne({ listing: listingId, user: userId });
      if (existingBooking) {
        return res.status(400).json({ success: false, message: "You have already requested to join this listing." });
      }
  
      // Create a new roommate booking request
      const booking = await Booking.create({ listing: listingId, user: userId, status: "pending" });
  
      return res.status(201).json({ success: true, message: "Roommate request sent successfully.", data: booking });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// 🟢 (5) Current occupant approves a roommate
export const approveRoommate = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user._id;

    const booking = await Booking.findById(bookingId).populate("listing");
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    const listing = await Listing.findById(booking.listing._id);
    if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

    if (!listing.currentOccupants.includes(userId)) {
      return res.status(403).json({ success: false, message: "Only current occupants can approve roommates." });
    }

    if (!listing.currentOccupants) listing.currentOccupants = [];

    if (listing.currentOccupants.length < listing.capacity) {
      listing.currentOccupants.push(booking.user);
      await listing.save();

      booking.status = "confirmed";
      await booking.save();

      return res.status(200).json({ success: true, message: "Roommate approved", data: booking });
    } else {
      return res.status(400).json({ success: false, message: "No available space" });
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
