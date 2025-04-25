// import FoodItem from "../models/FoodItem.js";
// import DailyLog from "../models/DailyLog.js";

// export const addFoodItem = async (req, res) => {
//   const item = await FoodItem.create(req.body);
//   res.status(201).json(item);
// };

// export const getFoodItems = async (req, res) => {
//   const items = await FoodItem.find();
//   res.json(items);
// };

// export const logDailyFood = async (req, res) => {
//   const { foodItems, date } = req.body;
//   const userId = req.user.id;

//   let totals = {
//     totalCalories: 0,
//     totalProtein: 0,
//     totalCarbs: 0,
//     totalFat: 0,
//   };
//   for (const entry of foodItems) {
//     const item = await FoodItem.findById(entry.foodId);
//     if (!item) continue;
//     const qty = entry.quantity;
//     totals.totalCalories += item.calories * qty;
//     totals.totalProtein += item.protein * qty;
//     totals.totalCarbs += item.carbs * qty;
//     totals.totalFat += item.fat * qty;
//   }

//   const log = await DailyLog.create({
//     userId,
//     date,
//     foodItems,
//     ...totals,
//   });

//   res.status(201).json(log);
// };

// export const getDailyLogs = async (req, res) => {
//   const logs = await DailyLog.find({ userId: req.user.id });
//   res.json(logs);
// };

import FoodItem from "../models/FoodItem.js";
import DailyLog from "../models/DailyLog.js";

export const addFoodItem = async (req, res) => {
  const { name, calories, carbs, protein, fat, category } = req.body;
  try {
    const food = await FoodItem.create({
      name,
      calories,
      carbs,
      protein,
      fat,
      category,
    });
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ message: "Failed to add food item", error: err });
  }
};

export const logMeal = async (req, res) => {
  const { foodItems, date } = req.body;
  const userId = req.user.id;

  try {
    let totalCalories = 0;
    let nutrients = { carbs: 0, protein: 0, fat: 0 };

    for (const item of foodItems) {
      const food = await FoodItem.findById(item.foodId);
      const quantity = item.quantity || 1;
      totalCalories += food.calories * quantity;
      nutrients.carbs += food.carbs * quantity;
      nutrients.protein += food.protein * quantity;
      nutrients.fat += food.fat * quantity;
    }

    const log = await DailyLog.create({
      userId,
      date,
      foodItems,
      totalCalories,
      nutrients,
    });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: "Failed to log meal", error: err });
  }
};

export const getLogs = async (req, res) => {
  try {
    const logs = await DailyLog.find({ userId: req.user.id }).populate(
      "foodItems.foodId"
    );
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch logs", error: err });
  }
};
