import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http"; // For creating the server
import { Server } from "socket.io"; // For real-time communication
import { initSocket } from "./socket.js";


// Routes
import authRoutes from "./routes/AuthRoute.js";
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

// Setup CORS for frontend-backend communication
app.use(
  cors({
    origin: [process.env.ORIGIN], // E.g. http://localhost:5173
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse incoming JSON data

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/chat", chatRoutes);

// Create HTTP server and integrate with socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Initialize socket handling
initSocket(io);

// Start server
server.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});

// Connect to MongoDB
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => console.error("❌ DB Error:", err.message));

 
  