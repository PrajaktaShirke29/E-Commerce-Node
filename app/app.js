import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
dotEnv.config();
import dbconnect from "../config/dbconnect.js";
import userRoutes from "../routes/usersRoute.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";
import productRoutes from "../routes/productsRoute.js";

dbconnect();

const app = express();
// pass incoming data
app.use(express.json());
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

// error middleware
app.use(notFound);
app.use(globalErrorHandler);
export default app;
