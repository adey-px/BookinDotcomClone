import express from "express";

import { allHotels, createHotel, deleteHotel, 
        getHotel, updateHotel } from "../views/hotelView.js";


const router = express.Router();

// Path for creating new hotel
router.post("/create-hotel", createHotel);

// Path for reading or getting hotel
router.get("/get-hotel/:id", getHotel);

//  Path reading or getting all hotels
router.get("/all-hotels", allHotels);

// Path for updating or editing hotel
router.put("/edit-hotel/:id", updateHotel)

// Path for deleting hotel
router.delete("/delete/:id", deleteHotel)


export default router