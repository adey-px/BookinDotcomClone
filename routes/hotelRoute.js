import express from "express";

import { verifyAdmin } from "../utils/verifyToken.js";

import { allHotels, createHotel, deleteHotel, 
        getHotel, updateHotel } from "../views/hotelView.js";


const router = express.Router();

// Create new hotel
router.post("/create-hotel", verifyAdmin, createHotel)

// Read or get hotel
router.get("/get-hotel/:id", getHotel)

// Read or get ALL hotels
router.get("/all-hotels", allHotels)

// Update hotel
router.put("/update-hotel/:id", verifyAdmin, updateHotel)

// Delete hotel
router.delete("/delete/:id", verifyAdmin, deleteHotel)


export default router