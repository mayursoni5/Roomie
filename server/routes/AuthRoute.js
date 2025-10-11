import { Router } from "express";
import {
  login,
  logout,
  signup,
  updateLookingFor,
  updateProfile,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post("/update-looking-for", verifyToken, updateLookingFor);
authRoutes.post("/logout", logout);

export default authRoutes;
