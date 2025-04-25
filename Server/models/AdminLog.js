// import mongoose from "mongoose";

// const adminLogSchema = new mongoose.Schema({
//   adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   action: String,
//   timestamp: { type: Date, default: Date.now },
// });

// export default mongoose.model("AdminLog", adminLogSchema);

import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema({
  action: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("AdminLog", adminLogSchema);
