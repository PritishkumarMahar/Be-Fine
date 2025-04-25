
import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
  category: { type: String, enum: ["Breakfast", "Lunch", "Dinner", "Snacks"] },
});

export default mongoose.model("FoodItem", foodItemSchema);
