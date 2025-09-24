import Thematique from "../models/Thematique.js";
import mongoose from "mongoose";

// Créer
export const addThematique = async (req, res) => {
  try {
    const { nom } = req.body;

    if (!nom) return res.status(400).json({ error: "Nom requis" });

    const existing = await Thematique.findOne({ nom: { $regex: `^${nom}$`, $options: "i" } });
    if (existing) return res.status(409).json({ error: "Thématique déjà existante" });

    const imagePath = req.file ? `/images/thematique/${req.file.filename}` : null;

    const newTheme = await Thematique.create({
      nom: nom.trim(),
      image: imagePath
    });

    res.status(201).json(newTheme);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Lire toutes
export const getThematiques = async (req, res) => {
  const thematiques = await Thematique.find().sort({ createdAt: -1 });
  res.json(thematiques);
};

// Lire une
export const getThematiqueById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "ID invalide" });

    const theme = await Thematique.findById(id);
    if (!theme) return res.status(404).json({ error: "Non trouvée" });

    res.json(theme);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Modifier
export const updateThematique = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom } = req.body;

    const theme = await Thematique.findById(id);
    if (!theme) return res.status(404).json({ error: "Non trouvée" });

    const imagePath = req.file ? `/images/thematiques/${req.file.filename}` : theme.image;

    theme.nom = nom || theme.nom;
    theme.image = imagePath;
    await theme.save();

    res.json(theme);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer
export const deleteThematique = async (req, res) => {
  try {
    const { id } = req.params;
    await Thematique.findByIdAndDelete(id);
    res.json({ message: "Thématique supprimée" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
