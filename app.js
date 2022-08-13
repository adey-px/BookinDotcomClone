import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"


// Load environment variables
dotenv.config()

// Handle initial connection to db and detect error
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
      } catch (error) {
        throw error;
      }
};

mongoose.connection.on("connected", () => {
    console.log("App connected to mongodb...")
});

mongoose.connection.on("disconnected", () => {
    console.log("(: App disconnected from mongodb")
});





const app = express()
app.listen(5000, () => {
    connect()
    console.log("App connected to node server...")
})