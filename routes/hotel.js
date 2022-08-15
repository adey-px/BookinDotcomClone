import express from "express";
import Hotel from "../models/Hotel.js";


const router = express.Router();

// Paths for middlewares in app

// Create new hotel and save in db
router.post("/create-hotel", async (req, res) => {

    const hotel = new Hotel(req.body);

    try {
        const createHotel = await hotel.save();
        res.status(200).json(createHotel);

    } catch (error) {
        res.status(500).json(error);
    }
});

// Read or get an existing hotel from db
router.get("/get-hotel/:id", async (req, res) => {

    try {
        const hotel = await Hotel.findbyId(
            req.params.id
        );
        res.status(200).json(hotel);

    } catch (error) {
        res.status(500).json(error);
    }
});

// Read or get ALL existing hotels from db
router.get("/get-all-hotels", async (req, res, next) => {

    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);

    } catch (err) {
        next(err);
    }
});

// Update an existing hotel in db
router.put("/edit-hotel/:id", async (req, res) => {

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updateHotel)

    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete existing hotel in db
router.delete("/delete/:id", async (req, res) => {

    try {
        await Hotel.findByIdAndDelete(
            req.params.id)
        res.status(200).json("Hotel has been deleted successfully")

    } catch (error) {
        res.status(500).json(error)
    }
})


export default router