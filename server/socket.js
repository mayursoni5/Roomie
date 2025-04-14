import { Server } from "socket.io";

let io;
const users = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("addUser", (userId) => {
      console.log("User added to map:", userId);
      users.set(userId, socket.id);
    });

    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      console.log("Message received at server:", { senderId, receiverId, message });

      const receiverSocket = users.get(receiverId);
      if (receiverSocket) {
        console.log(`Forwarding message to receiver's socket: ${receiverSocket}`);
        io.to(receiverSocket).emit("receiveMessage", { senderId, message });
      } else {
        console.log("Receiver not connected:", receiverId);
      }
    });

    socket.on("disconnect", () => {
      for (let [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId);
          console.log("User disconnected & removed from map:", userId);
          break;
        }
      }
    });
  });
};
