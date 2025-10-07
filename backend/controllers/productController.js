import Produit from "../models/Produits.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import { addMiseEnVente } from "./userController.js";

export const addProduct = async (req, res) => {
  try {
    const { titre, description, prix, id_categorie, theme, location, state, sellerType } = req.body;

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
    console.log("id du produit ajouté", newProduit._id);

    // Ajouter le produit à la mise en vente de l'utilisateur
    console.log("req.user dans addProduct", req.user);
    const UserId = req.user._id;
    console.log("id de l'utilisateur connecté", UserId);
    await addMiseEnVente(UserId, newProduit._id);

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
