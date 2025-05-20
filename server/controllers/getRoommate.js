import User from "../models/UserModel.js";

export const getRoommates = async (req, res) => {
  try {
    const roommates = await User.find({ lookingfor: "Rented Room", profileSetup: true });
    res.status(200).json({ roommates });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleRoommate = async (req, res) => {
  try {
    const roommate = await User.findById(req.params.id);
    if (!roommate) {
      return res.status(404).json({ message: "Roommate not found" });
    }
    res.json({ roommate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
