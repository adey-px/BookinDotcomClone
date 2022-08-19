import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoute.js";
import hotelRoute from "./routes/hotelRoute.js";
import roomRoute from "./routes/roomRoute.js";
import userRoute from "./routes/userRoute.js";


// Initialize an instance of express app
const app = express()

// Load environment variables from dotenv
dotenv.config();

// Check connection to mongodb to detect error
const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO);
        console.log("App connected to mongodb...")

      } catch (error) {
        throw error;
      }
};

mongoose.connection.on("disconnected", () => {
    console.log("App disconnected from mongodb (:")
});

// API for tesing paths with json in insomnia
app.use(express.json())

// Middleware prefixes for paths in route files
app.use("/auth", authRoute);
app.use("/hotel", hotelRoute);
app.use("/room", roomRoute);
app.use("/user", userRoute);

// Middleware to set token for user when login
app.use(cookieParser())

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
app.listen(5000, () => {
    connect()
    console.log("App connected to node server...")
})