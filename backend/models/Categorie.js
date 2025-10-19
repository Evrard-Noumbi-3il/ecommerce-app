import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  image: String,
  vues: { type: Number, default: 0 },
  id_thematique: { type: mongoose.Schema.Types.ObjectId, ref: "Thematique" }
});

export default mongoose.model("Categorie", categorieSchema);