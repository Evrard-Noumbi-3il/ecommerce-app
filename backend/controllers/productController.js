import Produit from "../models/Produits.js";
<<<<<<< HEAD
//import axios from "axios";
//import jwt from "jsonwebtoken";
=======
>>>>>>> ab0fde697e74ceda7b1f2b6fdf9f8c54626116b4
import { addMiseEnVente } from "./userController.js";

export const addProduct = async (req, res) => {
  try {
    const { userId, titre, description, prix, id_categorie, theme, location, state, sellerType } = req.body;

    if (!titre || !description || !prix || !id_categorie || !theme || !location || !state || !sellerType) {
      return res.status(400).json({
        message: "Tous les champs sont requis ❌"
      });
    }

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
    console.log("id de l'utilisateur connecté", userId);
    console.log("id du produit ajouté", newProduit._id);

    // Ajouter le produit à la mise en vente de l'utilisateur
    await addMiseEnVente(userId, newProduit._id);

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
