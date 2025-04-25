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
    // Ensure the user is an admin
    if (req.user.role !== "Admin" && req.user.role !== "SuperAdmin") {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const { name, calories, carbs, protein, fat, category } = req.body;

    // Validate the input
    if (!name || !calories || !carbs || !protein || !fat || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the food item
    const foodItem = await FoodItem.create({
      name,
      calories,
      carbs,
      protein,
      fat,
      category,
    });

    res.status(201).json({ message: "Food item added successfully", foodItem });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
