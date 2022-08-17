import mongoose from "mongoose";


const { Schema } = mongoose;

// Room model
const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    maxPerson: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    roomNumber: [{number: Number, 
                   unAvailable: {type: [Date]}
                }],
  },

  { timestamps: true }

);

export default mongoose.model("Room", RoomSchema);