import express from 'express';
import {
	register,
	login,
} from '../controllers/authContr.js';
/*
Best practice to separate auth routes from user routes.
It makes easy to use cookies, json web token, etc.
*/
const router = express.Router();

// Register new user
router.post('/register', register);

// User login
router.post('/login', login);

export default router;
