import jwt from "jsonwebtoken";

import { createError } from "../utils/error.js";


// Check access_token from cookies set in user login
export const verifyToken = (req, res, next) => {

  // Bring user token set in cookie from login
  const loginToken = req.cookies.access_token;

  // If user token is not found from login
  if (!loginToken) {
    return next(createError(401, "You are not authenticated!"));
  }

  // if (loginToken) - verify it and load the hidden user details
  jwt.verify(loginToken, process.env.JWT, (err, userInfo) => {

    if (err) 
      return next(createError(403, "Your token is not valid!"));

    // if (no err) on the token
    req.user = userInfo;

    next();
  });
};


// Verify user authentication
export const verifyUser = (req, res, next) => {

  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();

    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};


// Verify admin authentication
export const verifyAdmin = (req, res, next) => {

  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();

    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};