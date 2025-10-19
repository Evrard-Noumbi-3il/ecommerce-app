import mongoose from "mongoose";

const produitSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String },
    prix: { type: Number, required: true },
    id_categorie: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie" },
    theme: { type: String },
    location: { type: String },
    state: { type: String, enum: ["neuf", "occasion"], default: "occasion" },
    sellerType: { type: String, enum: ["particulier", "professionnel"], default: "particulier" },
    images: [{ type: String }],
    vues: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "pending", "rejected"], default: "pending"},
    signale: { type: Boolean, default: false}
  },
  { timestamps: true } 
);

export default mongoose.model("Produit", produitSchema);