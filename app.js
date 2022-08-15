import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotel.js";
import roomRoute from "./routes/room.js";
import userRoute from "./routes/user.js";


// Initialize an instance of express app
const app = express()

// Load environment variables from dotenv
dotenv.config();

// Verify initial connection to db to detect error
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
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

// Middlewares for paths defined in route files
app.use("/auth", authRoute);
app.use("/hotel", hotelRoute);
app.use("/room", roomRoute);
app.use("/user", userRoute);

// Middlewares for custom error handling
app.use((err, req, res, next) => {

  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Oops!, error detected!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//
// Connect app to node server with call to db
app.listen(5000, () => {
    connect()
    console.log("App connected to node server...")
})