import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { raiseError } from '../helpers/raiseError.js';

// Register user account
export const register = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const user = new User({
			...req.body,
			password: hash,
		});

		await user.save();
		res.status(200).send('Your account has been created');
	} catch (err) {
		next(err);
	}
};

// Login user account
export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({
			username: req.body.username,
		});
		if (!user)
			return next(
				raiseError(404, 'Sorry! this user is not found')
			);

		const authPass = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!authPass)
			return next(
				raiseError(400, 'Check your password and try again')
			);

		// verify identity, hide selected user details in jwt, sent into cookie
		const userToken = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT
		);

		// Prevent user password etc from being sent over http when login
		const { password, isAdmin, ...otherDetails } =
			user._doc;

		// Set cookie for checking user role and permission
		res
			.cookie('access_token', userToken, { httpOnly: true })
			.status(200)
			.json({ details: { ...otherDetails }, isAdmin });
	} catch (err) {
		next(err);
	}
};
