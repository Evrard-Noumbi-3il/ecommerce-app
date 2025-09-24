import mongoose from "mongoose";

const publiciteSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true,
    },
    information: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "/images/publicites/default.png", // image par défaut
    },
  },
  { timestamps: true }
);

export default mongoose.model("Publicite", publiciteSchema);
