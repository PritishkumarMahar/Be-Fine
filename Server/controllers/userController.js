import User from "../models/User.js"; // Importing the User model
import DailyLog from "../models/DailyLog.js"; // Importing the DailyLog model
import FoodItem from "../models/FoodItem.js"; // Importing the FoodItem model
// Get Profile function
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude sensitive information (password)
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile retrieved successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile function
export const updateProfile = async (req, res) => {
  try {
    // By the time this code runs, the `protect` middleware will have verified the token
    // and added `req.user` to the request object with the authenticated user's details.
    const updates = req.body; // Data to update from request body
    const allowedFields = [
      "name",
      "age",
      "gender",
      "weight",
      "height",
      "goal",
      "role",
      "isVerified",
    ]; // Define fields that are allowed to be updated

    const user = await User.findById(req.user.id); // Find the user using the ID from middleware
    if (!user) return res.status(404).json({ message: "User not found" });

    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
        user[key] = updates[key]; // Update only allowed fields
      }
    });

    const updatedUser = await user.save(); // Save the updated user data

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// getUserLogs function

export const getUserLogs = async (req, res) => {
  try {
    // Get the user ID from the authenticated request (populated by the `protect` middleware)
    const userId = req.user.id;

    // Fetch all logs for the user
    const logs = await DailyLog.find({ userId }).populate("foodItems.foodId"); // Populate food items if needed

    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: "No logs found for this user" });
    }

    res.status(200).json({
      message: "Logs retrieved successfully",
      logs,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// updateUserLogs function
export const updateUserLogs = async (req, res) => {
  try {
    const { date, foodItems } = req.body; // Extract data from request body

    // Fetch nutritional details for food items
    const detailedFoodItems = await Promise.all(
      foodItems.map(async (item) => {
        const food = await FoodItem.findById(item.foodId); // Fetch food item details
        if (!food) {
          throw new Error(`Food item with ID ${item.foodId} not found`);
        }
        return {
          ...item,
          calories: food.calories * item.quantity,
          carbs: food.carbs * item.quantity,
          protein: food.protein * item.quantity,
          fat: food.fat * item.quantity,
        };
      })
    );

    // Find the user's log for the specified date
    let log = await DailyLog.findOne({ userId: req.user.id, date });

    if (!log) {
      // If no log exists for that date, create a new one
      log = new DailyLog({
        userId: req.user.id,
        date,
        foodItems: detailedFoodItems,
      });
    } else {
      // If a log exists, update it with the new food items
      log.foodItems = detailedFoodItems;
    }

    // Calculate total calories and nutrients
    let totalCalories = 0;
    let carbs = 0;
    let protein = 0;
    let fat = 0;

    detailedFoodItems.forEach((item) => {
      totalCalories += item.calories;
      carbs += item.carbs;
      protein += item.protein;
      fat += item.fat;
    });

    log.totalCalories = totalCalories;
    log.nutrients = { carbs, protein, fat };

    await log.save(); // Save the updated or new log

    res.status(200).json({
      message: "Logs updated successfully",
      log,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};