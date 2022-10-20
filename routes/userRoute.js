import express from "express";

import {
  updateUser,
  deleteUser,
  getUser,
  allUsers,
} from "../controllers/userContr.js";

import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Read or get user
router.get("/auth-User/:id", verifyUser, getUser);

// Read or get all users
router.get("/auth-Users", verifyAdmin, allUsers);

// Update user
router.put("/update-User/:id", verifyUser, updateUser);

// Delete user
router.delete("/delete/:id", verifyUser, deleteUser);

// Test Check user auth
router.get("/test/check-user", verifyToken, (req, res, next) => {
  res.send("Hello user, you are logged in");
});

// Test Check user update auth
router.get("/check-user/:id", verifyUser, (req, res, next) => {
  res.send("Hi, You are logged in and you can delete your account");
});

// Test Check admin auth
router.get("/check-admin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hi admin, you are logged in and you can delete ALL users");
});


export default router;