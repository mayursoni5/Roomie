import expess from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoute.js";
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

dotenv.config();

const app = expess();
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(expess.json());

app.get("/", (req, res) => {
  res.json({ msg: "Hello Roomie" });
});
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(port, () => {
  console.log(`The Server is running on ${port}`);
});

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err.message));
