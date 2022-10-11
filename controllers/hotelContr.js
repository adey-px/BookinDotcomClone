import Hotel from "../models/Hotel.js";


// Create new hotel
export const createHotel = async (req, res, next) => {
    const brand = new Hotel(req.body);
    try {
        const hotel = await brand.save();
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

// Read or get hotel
export const unitHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id
        );     
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

// Read or get all hotels
export const getHotels = async (req, res, next) => {
    const {min, max, ...others} = req.query;
    try {
        const hotels = await Hotel.find({
            cheapestPrice: {$gt: min | 1, $lt: max || 999},
            ...others,
        }).limit(req.query.limit);

        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}

export const countByCity = async (req, res, next) => {
    const getCities = req.query.locations.split(",");
    try {
        const list = await Promise.all(getCities.map(city => {
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const countByType = async (req, res, next) => {
    try {
        const countApt = await Hotel.countDocuments({category: "Apartment"});
        const countCabin = await Hotel.countDocuments({category: "Cabin"});
        const countHotel = await Hotel.countDocuments({category: "Hotel"});
        const countResort = await Hotel.countDocuments({category: "Resort"});
        const countVilla = await Hotel.countDocuments({category: "Villa"})

        res.status(200).json([
            {category:"Apartments", number:countApt},
            {category:"Cabins", number:countCabin},
            {category:"Hotels", number:countHotel},
            {category:"Resorts", number:countResort},
            {category:"Villas", number:countVilla}
        ]);
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