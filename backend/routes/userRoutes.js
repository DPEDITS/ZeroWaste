import express from "express";
import {
  signupUser,
  loginUser,
  getAllUsers,
  approveUser,
  rejectUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Signup
router.post("/signup", signupUser);
router.post("/login", loginUser);

// Admin APIs
router.get("/all", getAllUsers);
router.put("/approve/:id", approveUser);
router.put("/reject/:id", rejectUser);
router.delete("/:id", deleteUser);

export default router;