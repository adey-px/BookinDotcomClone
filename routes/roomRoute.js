import express from "express";

import {createRoom, deleteRoom, getRoom, allRooms,
        editRoom, roomStatus} from "../views/roomView.js";

import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

// Path for creating new room
router.post("/:hotelid", verifyAdmin, createRoom);

// Path for reading or getting room
router.get("/:id", getRoom);

// Path for reading or getting ALL rooms
router.get("/", allRooms);

// Path for updating room and room status
router.put("/:id", verifyAdmin, editRoom);
router.put("/status/:id", roomStatus);

//Path for deleting room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);


export default router;