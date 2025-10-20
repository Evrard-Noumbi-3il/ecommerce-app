import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    subject: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    prix: {
      type: Number,
      default: 0,
    },
    read: {
      type: Boolean,
      default: false,
    },
    timestamps: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Messages", messageSchema);