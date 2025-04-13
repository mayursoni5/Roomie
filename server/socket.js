// socket.js
import { Server } from "socket.io";

let io;
const users = new Map(); // userId -> socketId

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Add user to users map
    socket.on("addUser", (userId) => {
      users.set(userId, socket.id);
    });

    // Handle message sending
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      const receiverSocket = users.get(receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", {
          senderId,
          message,
        });
      }
    });

    // Remove user on disconnect
    socket.on("disconnect", () => {
      for (let [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId);
          break;
        }
      }
      console.log("User disconnected:", socket.id);
    });
  });
};
