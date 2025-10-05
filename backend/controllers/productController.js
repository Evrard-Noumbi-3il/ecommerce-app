import Produit from "../models/Produits.js";

export const addProduct = async (req, res) => {
  try {
    const { titre, description, prix, id_categorie, theme, location, state, sellerType } = req.body;

    // Créer le produit
    const newProduit = new Produit({
      titre,
      description,
      prix,
      id_categorie,
      theme,
      location,
      state,
      sellerType
    });

    await newProduit.save();

    return res.status(201).json({
      message: "Produit ajouté avec succès ✅",
      produit: newProduit
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur ❌",
      error: error.message
    });
  }
};

