import express from "express";
import {
  addFoodItem,
  logMeal,
  getLogs,
} from "../controllers/foodController.js";
import {
  getFoodItem
} from "../controllers/adminController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/add", auth, addFoodItem);
router.post("/log", auth, logMeal);
router.get("/logs", auth, getLogs);
router.get("/food", auth, getFoodItem);

export default router;
