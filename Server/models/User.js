import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["User", "Admin", "SuperAdmin"],
      default: "User",
    },
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpiry: Date,
    age: Number,
    gender: String,
    weight: Number,
    height: Number,
    goal: { type: String, enum: ["Gain", "Maintain", "Lose"] },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
