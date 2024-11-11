import express from "express";
import {
  getUserProfileCtrl,
  loginUserCtrl,
  registerUserCtrl,
} from "../controllers/usersCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile", authMiddleware, getUserProfileCtrl);

export default userRoutes;
