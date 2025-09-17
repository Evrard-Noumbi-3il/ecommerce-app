import mongoose from "mongoose";

const thematiqueSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  image: String,
  nbrFoisRecherché: { type: Number, default: 0 }
});

export default mongoose.model("Thematique", thematiqueSchema);