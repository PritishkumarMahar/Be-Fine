// import express from "express";
// import {
//   addFoodItem,
//   getFoodItems,
//   logDailyFood,
//   getDailyLogs,
// } from "../controllers/foodController.js";
// import auth from "../middlewares/auth.js";

// const router = express.Router();

// router.post("/", auth, addFoodItem);
// router.get("/", auth, getFoodItems);
// router.post("/log", auth, logDailyFood);
// router.get("/logs", auth, getDailyLogs);

// export default router;

import express from "express";
import {
  addFoodItem,
  logMeal,
  getLogs,
} from "../controllers/foodController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/add", auth, addFoodItem);
router.post("/log", auth, logMeal);
router.get("/logs", auth, getLogs);

export default router;
