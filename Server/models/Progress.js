// import mongoose from "mongoose";

// const progressSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   date: Date,
//   weight: Number,
//   goalStatus: String,
// });

// export default mongoose.model("Progress", progressSchema);

import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: Date,
    weight: Number,
    caloriesBurned: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
