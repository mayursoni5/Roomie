import Booking from "../models/BookingModel.js";
import Listing from "../models/ListingModel.js";
export const requestBooking = async (req, res) => {
  try {
    const { listingId } = req.body;
    const userId = req.user._id;

    const listing = await Listing.findById(listingId);
    if (!listing)
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });

    const existingBooking = await Booking.findOne({
      listing: listingId,
      user: userId,
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({
          success: false,
          message: "You already requested this listing",
        });
    }

    const booking = await Booking.create({
      listing: listingId,
      user: userId,
      status: "pending",
    });

    return res
      .status(201)
      .json({ success: true, message: "Booking request sent", data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId).populate("listing");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    const listing = await Listing.findById(booking.listing._id);
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    if (req.user._id.toString() !== listing.owner.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Only owner can approve the first booking.",
        });
    }

    listing.currentOccupants.push(booking.user);

    listing.isAvailableForRoommates = true;

    await listing.save();

    booking.status = "confirmed";
    await booking.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Booking approved, listing is now open for roommates",
        data: booking,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listForRoommates = async (req, res) => {
  try {
    const { listingId } = req.body;
    const userId = req.user._id;

    const listing = await Listing.findById(listingId);
    if (!listing)
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });

    if (!listing.currentOccupants.includes(userId)) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Only current occupants can list for roommates.",
        });
    }

    listing.isAvailableForRoommates = true;
    await listing.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Listing is now available for roommates",
        data: listing,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const requestRoommateBooking = async (req, res) => {
  try {
    const { listingId } = req.body;
    const userId = req.user._id;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found." });
    }

    // Check if user already requested to join
    const existingBooking = await Booking.findOne({
      listing: listingId,
      user: userId,
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({
          success: false,
          message: "You have already requested to join this listing.",
        });
    }

    // Create a new roommate booking request
    const booking = await Booking.create({
      listing: listingId,
      user: userId,
      status: "pending",
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "Roommate request sent successfully.",
        data: booking,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveRoommate = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user._id;

    const booking = await Booking.findById(bookingId).populate("listing");
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    const listing = await Listing.findById(booking.listing._id);
    if (!listing)
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });

    if (!listing.currentOccupants.includes(userId)) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Only current occupants can approve roommates.",
        });
    }

    if (!listing.currentOccupants) listing.currentOccupants = [];

    if (listing.currentOccupants.length < listing.capacity) {
      listing.currentOccupants.push(booking.user);
      await listing.save();

      booking.status = "confirmed";
      await booking.save();

      return res
        .status(200)
        .json({ success: true, message: "Roommate approved", data: booking });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "No available space" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
