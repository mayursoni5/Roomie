import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoute.js";
import roomRoutes from "./routes/RoomRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import getroomiesRoutes from "./routes/getroomiesRoutes.js"

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

app.get("/", (req, res) => {
  res.json({ msg: "Hello Roomie" });
});
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/roomies",getroomiesRoutes)
app.use("/api/listings", listingRoutes);

app.listen(port, () => {
  console.log(`The Server is running on ${port}`);
});

// Connect to MongoDB
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => console.error("❌ DB Error:", err.message));

 
  