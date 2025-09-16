import mongoose from "mongoose";

const produitSchema = new mongoose.Schema({
  nom: String,
  description: String,
  prix: Number,
  localisation: String,
  etat: String,
  images: [String], 
  id_categorie: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Produit", produitSchema);