import express from "express";

import {createRoom, deleteRoom, getRoom, allRooms,
        updateRoom, roomStatus} from "../views/roomView.js";

import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

// Create new room
router.post("/:hotelid", verifyAdmin, createRoom)

// Read or get room
router.get("/:id", getRoom)

// Read or get ALL rooms
router.get("/", allRooms)

// Update room and room status
router.put("/status/:id", roomStatus)
router.put("/:id", verifyAdmin, updateRoom)

// Delete room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)


export default router;