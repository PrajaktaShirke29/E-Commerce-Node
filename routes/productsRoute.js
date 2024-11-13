import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createProductCtrl,
  getAllProductCtrl,
} from "../controllers/productCtrl.js";

const productRoutes = express.Router();

productRoutes.post("/", authMiddleware, createProductCtrl);
productRoutes.get("/", authMiddleware, getAllProductCtrl);

export default productRoutes;
