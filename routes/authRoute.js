import express from "express";
import { register, login } from "../views/authView.js";


const router = express.Router();

// Path for new user registration
router.post("/register", register)

// Path for user login
router.post("/login", login)










export default router