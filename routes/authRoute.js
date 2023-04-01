import express from 'express';
import {
	register,
	login,
} from '../controllers/authContr.js';

const router = express.Router();

// Register new user
router.post('/register', register);

// User login
router.post('/login', login);

export default router;
