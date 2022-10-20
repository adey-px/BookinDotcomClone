import express from "express";

import {
  createRoom,
  deleteRoom,
  getRoom,
  allRooms,
  updateRoom,
  updateRmStatus,
} from "../controllers/roomContr.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create new room for hotel
router.post("/:hotelid", verifyAdmin, createRoom);

// Read or get hotel room
router.get("single-room/:id", getRoom);

// Read or get all rooms
router.get("/all-rooms", allRooms);

// Update room and room status in hotel
router.put("/update-room/:id", verifyAdmin, updateRoom);
router.put("/update-status/:id", updateRmStatus);

// Delete room
router.delete("/delete/:id/:hotelid", verifyAdmin, deleteRoom);

export default router;
