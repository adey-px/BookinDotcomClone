import mongoose from "mongoose";


const { Schema } = mongoose;

// Hotel model
const HotelSchema = new Schema(
  {
  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },
  
  address: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  distance: {
    type: String,
    required: true,
  },

  image: {
    type: [String],
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
  },

  room: {
    type: [String],
  },

  cheapestPrice: {
    type: Number,
    required: true,
  },

  featured: {
    type: Boolean,
    default: false,
  },

});

export default mongoose.model("Hotel", HotelSchema)