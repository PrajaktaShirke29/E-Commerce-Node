import express from "express";
import dotEnv from "dotenv";
dotEnv.config();
import dbconnect from "../config/dbconnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrorHandler, notFound } from "../middlewares/globalErrorHandler.js";

dbconnect();

const app = express();
// pass incoming data
app.use(express.json());
// Routes
app.use("/api/v1/users", userRoutes);

// error middleware
app.use(notFound);
app.use(globalErrorHandler)
export default app;
