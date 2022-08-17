import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import {createError} from "../utils/error.js";


// Register new user account
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await user.save()
        res.status(200).send("Your account has been created")

    } catch (err) {
        next(err)
    }
}

// Login existing user account
export const login = async (req, res, next) => {
    try {
        const userN = await User.findOne({username: req.body.username})
        const passW = await bcrypt.compare(req.body.password, userN.password)

        if (!userN)
            return next(createError(404, "Sorry! this user is not found"))

        if (!passW)
            return next(createError(400, "Wrong username and/or password"))

        const token = jwt.sign(
            {id: userN._id, isAdmin: userN.isAdmin},
                process.env.JWT
            );
          
        const { password, isAdmin, ...otherDetails } = userN._doc;
            res
            .cookie("access_token", token, {httpOnly: true,})
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });

    } catch (err) {
        next(err)
    }
}