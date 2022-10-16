import express from "express";

import { verifyAdmin } from "../utils/verifyToken.js";

import {
  getHotels,
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  unitHotel,
  updateHotel,
  getHotelRooms,
} from "../controllers/hotelContr.js";

const router = express.Router();

// Create new hotel
router.post("/create-hotel", verifyAdmin, createHotel);

// Read or get hotel
router.get("/unit-hotel/:id", unitHotel);

// Read or get ALL hotels
router.get("/get-hotels", getHotels);
router.get("/sort-by-city", countByCity);
router.get("/sort-by-type", countByType);

// Update hotel
router.put("/update-hotel/:id", verifyAdmin, updateHotel);

// Delete hotel
router.delete("/delete/:id", verifyAdmin, deleteHotel);

// Get hotel rooms
router.get("/room/:id", getHotelRooms);


export default router;
