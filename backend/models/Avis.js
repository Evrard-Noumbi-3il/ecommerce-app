import mongoose from "mongoose";

const avisSchema = new mongoose.Schema(
  {
    userSend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    userReceive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    note: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comments: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);
export default mongoose.model("Avis", avisSchema);