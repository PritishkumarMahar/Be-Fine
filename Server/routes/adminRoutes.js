// ========== backend/routes/adminRoutes.js ==========
import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllLogs,
  getSystemStats,
  addFoodItem,
  getFoodItem,
  deleteFoodItem, // 🔥 Import deleteFoodItem controller
} from "../controllers/adminController.js";

import protect from "../middlewares/auth.js";
import { checkRole } from "../middlewares/roleCheck.js";

const router = express.Router();

// Only accessible by Admin or SuperAdmin
router.use(protect, checkRole("Admin", "SuperAdmin"));

router.get("/users", getAllUsers); // View all users
router.delete("/users/:id", deleteUser); // Delete a user
router.get("/logs", getAllLogs); // View admin action logs
router.get("/stats", getSystemStats); // Dashboard stats

router.post("/food-items", addFoodItem); // Add food item
router.get("/food-items", getFoodItem); // Get all food items
router.delete("/food-items/:id", deleteFoodItem); // 🔥 Delete food item by ID

export default router;
