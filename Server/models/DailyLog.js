import mongoose from "mongoose";

const dailyLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  foodItems: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
      quantity: Number,
    },
  ],
  totalCalories: Number,
  nutrients: {
    carbs: Number,
    protein: Number,
    fat: Number,
  },
});

export default mongoose.model("DailyLog", dailyLogSchema);
