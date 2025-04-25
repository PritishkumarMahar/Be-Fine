import express from "express";
import {
  getProfile,
  updateProfile,
  getUserLogs,
  updateUserLogs,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.get("/me", auth, getProfile);
router.post("/me", auth, updateProfile);
router.get("/user-logs", auth, getUserLogs);
router.post("/user-logs", auth, updateUserLogs);

export default router;
