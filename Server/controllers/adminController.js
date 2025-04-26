import AdminLog from "../models/AdminLog.js";
import User from "../models/User.js";
import DailyLog from "../models/DailyLog.js";
import FoodItem from "../models/FoodItem.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  await AdminLog.create({
    action: "DELETE_USER",
    adminId: req.user.id,
    targetUserId: id,
  });
  res.json({ message: "User deleted" });
};

export const getAllLogs = async (req, res) => {
  const logs = await AdminLog.find()
    .populate("adminId", "name email")
    .sort({ timestamp: -1 });
  res.json(logs);
};

export const getSystemStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalFoodItems = await FoodItem.countDocuments();
  const totalLogs = await DailyLog.countDocuments();

  res.json({
    totalUsers,
    totalFoodItems,
    totalLogs,
    timestamp: new Date(),
  });
};

export const addFoodItem = async (req, res) => {
  try {
    const { role } = req.user;
    const { name, calories, carbs, protein, fat, category } = req.body;

    // Ensure the user is an admin
    if (role !== "Admin" && role !== "SuperAdmin") {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Validate input fields
    if (
      !name?.trim() ||
      calories === undefined ||
      carbs === undefined ||
      protein === undefined ||
      fat === undefined ||
      !category
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the food item
    const foodItem = await FoodItem.create({
      name: name.trim(),
      calories,
      carbs,
      protein,
      fat,
      category,
    });

    return res.status(201).json({
      message: "Food item added successfully",
      foodItem,
    });
  } catch (err) {
    console.error("Error adding food item:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getFoodItem = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    return res.status(200).json(foodItems);
  } catch (err) {
    console.error("Error fetching food items:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ New deleteFoodItem function
export const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;

    const foodItem = await FoodItem.findById(id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    await foodItem.deleteOne();

    // Log the action (optional, if you want to log it like user deletion)
    await AdminLog.create({
      action: "DELETE_FOOD_ITEM",
      adminId: req.user.id,
      targetFoodItemId: id, // (Optional, make sure your AdminLog supports this field)
    });

    return res.status(200).json({ message: "Food item deleted successfully" });
  } catch (err) {
    console.error("Error deleting food item:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
