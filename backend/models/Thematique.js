import mongoose from "mongoose";

const thematiqueSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  nbrFoisRecherché: { type: Number, default: 0 }
});

export default mongoose.model("Thematique", thematiqueSchema);