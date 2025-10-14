import mongoose from "mongoose";

const favorisSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["produit", "thematique", "categorie"],
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number },
  description: { type: String },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model("Favoris", favorisSchema);
