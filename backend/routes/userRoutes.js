import express from "express";
import {
  signupUser,
  getAllUsers,
  approveUser,
  rejectUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Signup
router.post("/signup", signupUser);

// Admin APIs
router.get("/all", getAllUsers);
router.put("/approve/:id", approveUser);
router.put("/reject/:id", rejectUser);
router.delete("/:id", deleteUser);

export default router;