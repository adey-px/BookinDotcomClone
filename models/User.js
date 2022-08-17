import mongoose from "mongoose";


const { Schema } = mongoose;

// Model for registering new user
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
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
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

  },

  { timestamps: true }

);

export default mongoose.model("User", UserSchema);