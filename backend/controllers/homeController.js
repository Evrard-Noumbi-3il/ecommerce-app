import Publicite from "../models/Publicite.js";
import Thematique from "../models/Thematique.js";
import Categorie from "../models/Categorie.js";
import Produit from "../models/Produits.js";

// Récupérer toutes les publicités
export const getPublicites = async (req, res) => {
  try {
    const pubs = await Publicite.find();
    res.json(pubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//thématiques les plus recherchées
export const getTendances = async (req, res) => {
  try {
    const tendances = await Thematique.find()
      .sort({ nbrFoisRecherché: -1 })
      .limit(10);
    res.json(tendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toutes les catégories
export const getCategories = async (req, res) => {
  try {
    const categories = await Categorie.find().populate("id_thematique");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//derniers produits ajoutés
export const getNouveauxProduits = async (req, res) => {
  try {
    const produits = await Produit.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("id_categorie");
    res.json(produits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//toutes les thématiques
export const getThematiques = async (req, res) => {
  try {
    const thematiques = await Thematique.find();
    res.json(thematiques);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
