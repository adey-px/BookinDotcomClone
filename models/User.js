import mongoose from "mongoose";


const { Schema } = mongoose;

// User model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    city: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  {timestamps: true}

);

export default mongoose.model("User", UserSchema);