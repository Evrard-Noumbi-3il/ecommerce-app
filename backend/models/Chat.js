import mongoose from "mongoose";
const chatSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
