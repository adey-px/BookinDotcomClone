import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


// Create new room in hotel
export const createRoom = async (req, res, next) => {

  const hotelId = req.params.hotelid;
  const room = new Room(req.body);

  try {
    const newRoom = await room.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { room: newRoom._id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json(newRoom);

  } catch (err) {
    next(err);
  }
};


// Read or get room in hotel
export const getRoom = async (req, res, next) => {

  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  
  } catch (err) {
    next(err);
  }
};
  

// Read or get ALL rooms in hotel
export const allRooms = async (req, res, next) => {
  
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  
  } catch (err) {
    next(err);
  }
};


// Update room in hotel
export const updateRoom = async (req, res, next) => {
    
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedRoom);

  } catch (err) {
    next(err);
  }
};


// Update room status in hotel
export const roomStatus = async (req, res, next) => {

  try {
    await Room.updateOne(
      { "roomNumber._id": req.params.id },
      {$push: {
          "roomNumber.$.unAvailable": req.body.dates
        },
      }
    );

    res.status(200).json("Room status has been updated.");

  } catch (err) {
    next(err);
  }
};


// Delete room in hotel
export const deleteRoom = async (req, res, next) => {

  const hotelId = req.params.hotelid;

  try {
    await Room.findByIdAndDelete(req.params.id);

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { room: req.params.id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json("Room has been deleted.");

  } catch (err) {
    next(err);
  }
};
