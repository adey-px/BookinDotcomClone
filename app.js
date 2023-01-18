import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/authRoute.js";
import hotelRoute from "./routes/hotelRoute.js";
import roomRoute from "./routes/roomRoute.js";
import userRoute from "./routes/userRoute.js";

// Initialize an instance of express app
const app = express();

// Load environment variables from dotenv
dotenv.config();

// Check connection to mongodb to detect error
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Mongodb server is connected...");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("Mongodb server is down...");
});

// Optional to using proxy in client/package.json
app.use(cors());

// Middleware to set token for user when login
app.use(cookieParser());

// API for tesing paths with json in insomnia
app.use(express.json());

// Middleware prefixes for paths in route files
app.use("/auths", authRoute);
app.use("/hotels", hotelRoute);
app.use("/rooms", roomRoute);
app.use("/users", userRoute);

// Middleware for custom error handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Error detected!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Connect app to node server with call to db
app.listen(4000, () => {
  connect();
  console.log("Development server is running...");
});
