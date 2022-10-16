import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { createError } from "../utils/error.js";

// Register new user account
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phone,
    });

    await user.save();
    res.status(200).send("Your account has been created");
  } catch (err) {
    next(err);
  }
};

// Login user account
export const login = async (req, res, next) => {
  try {
    const authUser = await User.findOne({ username: req.body.username });
    const authPass = await bcrypt.compare(req.body.password, authUser.password);

    if (!authUser)
      return next(createError(404, "Sorry! this user is not found"));

    if (!authPass)
      return next(createError(400, "Check your password and try again"));

    // Prevent user password etc from being sent over http when login
    const { password, isAdmin, ...otherDetails } = authUser._doc;

    // To verify identity, hide selected user details in jwt, sent into cookie
    const userToken = jwt.sign(
      { id: authUser._id, isAdmin: authUser.isAdmin },
      process.env.JWT
    );

    // Set cookie for checking user role and permission
    res
      .cookie("access_token", userToken, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
