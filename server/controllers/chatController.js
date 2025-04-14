// controllers/chatController.js

import Message from "../models/Message.js";

// Save a new message
export const sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: "Message sent" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all messages between two users
export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
