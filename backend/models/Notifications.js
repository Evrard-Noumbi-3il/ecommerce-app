import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: { type: String, enum: ["info", "warning", "alert"],default:"info", required: true },
  target: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  from: { type: String, enum: ["system", "moderator"], default: "system" },
  message: { type: String, required: true },
  state: { type: String, enum: ["unread", "read"], default: "unread" },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);