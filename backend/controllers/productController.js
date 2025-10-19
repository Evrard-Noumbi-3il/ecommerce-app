import Produit from "../models/Produits.js";
//import jwt from "jsonwebtoken";
import { addMiseEnVente } from "./userController.js";

export const addProduct = async (req, res) => {
  try {
    const {
      userId,
      titre,
      description,
      prix,
      id_categorie,
      theme,
      location,
      state,
      sellerType,
    } = req.body;

    if (
      !titre ||
      !description ||
      !prix ||
      !id_categorie ||
      !theme ||
      !location ||
      !state ||
      !sellerType
    ) {
      return res.status(400).json({
        message: "Tous les champs sont requis ❌",
      });
    }

    const newProduit = new Produit({
      titre,
      description,
      prix,
      id_categorie,
      theme,
      location,
      state,
      sellerType,
    });

    await newProduit.save();
    //console.log("id de l'utilisateur connecté", userId);
    //console.log("id du produit ajouté", newProduit._id);

    // Ajouter le produit à la mise en vente de l'utilisateur
    await addMiseEnVente(userId, newProduit);

    return res.status(201).json({
      message: "Produit ajouté avec succès ✅",
      produit: newProduit,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur ❌",
      error: error.message,
    });
  }
};

export const validateAllPendingProducts = async (req, res) => {
  try {
    const result = await Produit.updateMany(
      { status: "pending" },
      { $set: { status: "active" } }
    );

    return res.status(200).json({
      message: `${result.nModified} produits en attente ont été validés avec succès ✅`
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur ❌",
      error: error.message
    });
  }
};

export const getProductsByDay = async (req, res) => {
  try {
    const stats = await Produit.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])
    res.json(stats)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

export const getProductsByStatus = async (req, res) => {
  try {
    const stats = await Produit.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])
    res.json(stats)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

export const getProductsByState = async (req, res) => {
  try {
    const stats = await Produit.aggregate([
      {
        $group: {
          _id: '$state',
          count: { $sum: 1 }
        }
      }
    ])
    res.json(stats)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

export const getProductsBySellerType = async (req, res) => {
  try {
    const stats = await Produit.aggregate([
      {
        $group: {
          _id: '$sellerType',
          count: { $sum: 1 }
        }
      }
    ])
    res.json(stats)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

export const getTopCategories = async (req, res) => {
  try {
    const stats = await Produit.aggregate([
      {
        $group: {
          _id: '$id_categorie',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'Categorie',
          localField: '_id',
          foreignField: '_id',
          as: 'categorie'
        }
      },
      { $unwind: '$categorie' },
      {
        $project: {
          _id: 0,
          categoryName: '$categorie.nom',
          count: 1
        }
      }
    ])
    res.json(stats)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

export const getTopViewedProducts = async (req, res) => {
  try {
    const produits = await Produit.find({ status: 'active' })
      .sort({ vues: -1 })
      .limit(10)
      .select('titre vues prix')
    res.json(produits)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};
