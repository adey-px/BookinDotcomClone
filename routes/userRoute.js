import express from "express";

import {updateUser, deleteUser, getUser, getUsers} 
        from "../views/userView.js";
        
import { verifyAdmin, verifyToken, verifyUser} 
        from "../utils/verifyToken.js";


const router = express.Router();

// Path to update user account
router.put("/:id", verifyUser, updateUser);

// Path to delete user account
router.delete("/:id", verifyUser, deleteUser);

// Path to retrieve user account
router.get("/:id", verifyUser, getUser);

// Path to retrieve ALL user accounts
router.get("/", verifyAdmin, getUsers);


export default router;