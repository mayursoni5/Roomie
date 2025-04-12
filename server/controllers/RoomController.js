import Room from "../models/RoomModel.js";

export const createRoom = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      city,
      rent,
      availableFrom,
      furnished,
    } = req.body;
    const { userId } = req;
    const createdBy = userId; // assuming you have verifyToken middleware to attach user

    const newRoom = new Room({
      title,
      description,
      address,
      city,
      rent,
      availableFrom,
      furnished,
      createdBy,
    });

    await newRoom.save();

    return res.status(201).json({
      message: "Room listed successfully",
      room: newRoom,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all Rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("createdBy", "userName city");

    return res.status(200).json({ rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single Room by ID
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate(
      "createdBy",
      "userName city"
    );

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({ room });
  } catch (error) {
    console.error("Error fetching room:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a Room
export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a Room
export const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);

    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
