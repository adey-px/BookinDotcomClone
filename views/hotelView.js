import Hotel from "../models/Hotel.js";


// Create new hotel
export const createHotel = async (req, res, next) => {

    const hotel = new Hotel(req.body);

    try {
        const freshHotel = await hotel.save();
        res.status(200).json(freshHotel);

    } catch (err) {
        next(err);
    }
}


// Read or get hotel
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findbyId(
            req.params.id
        );
        
        res.status(200).json(hotel);

    } catch (err) {
        next(err);
    }
}


// Read or get all hotels
export const allHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);

    } catch (err) {
        next(err);
    }
}


// Update hotel
export const updateHotel = async (req, res, next) => {
    try {
        const editHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        )

        res.status(200).json(editHotel)

    } catch (err) {
        next(err)
    }
}


// Delete hotel
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)

        res.status(200).json("Hotel deleted successfully")

    } catch (err) {
        next(err)
    }
}