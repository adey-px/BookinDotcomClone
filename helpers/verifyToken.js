import jwt from 'jsonwebtoken';
import { raiseError } from './raiseError.js';
/*
Check access_token from cookies set in user login 
*/

export const verifyToken = (req, res, next) => {
	/* user token in cookie from login */
	const loginToken = req.cookies.access_token;

	/* if no token from login, throw error */
	if (!loginToken) {
		return next(
			raiseError(401, 'You are not authenticated!')
		);
	}

	/* if token, check for error, load user detail */
	jwt.verify(
		loginToken,
		process.env.JWT,
		(err, userInfo) => {
			/* if error on token */
			if (err)
				return next(
					raiseError(403, 'Your token is not valid!')
				);

			/* if no error on token */
			req.user = userInfo;

			next();
		}
	);
};

// Verify user using verifyToken above
export const verifyUser = (req, res, next) => {
	verifyToken(req, res, next, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return next(
				raiseError(403, 'You are not authorized!')
			);
		}
	});
};

// Verify admin using verifyToken above
export const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, next, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			return next(
				raiseError(403, 'You are not authorized!')
			);
		}
	});
};
