import User from "../models/Users.js";
import Produit from "../models/Produits.js";
import Categorie from "../models/Categorie.js";
import Thematique from "../models/Thematique.js";
import mongoose from "mongoose";
import Notification from "../models/Notifications.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["admin", "moderator"] } }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const getAdminOrModerators = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["admin", "moderator"] } }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "moderator", "admin"].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Controller pour récupérer toutes les stats du dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    /** 1️⃣ Chiffre d'affaires total (CA) */
    const totalRevenueAgg = await Produit.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: null, totalRevenue: { $sum: "$prix" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.totalRevenue || 0;

    /** 2️⃣ Ventes du jour / semaine / mois */
    const ventesJour = await Produit.countDocuments({ status: "active", createdAt: { $gte: startOfToday } });
    const ventesSemaine = await Produit.countDocuments({ status: "active", createdAt: { $gte: startOfWeek } });
    const ventesMois = await Produit.countDocuments({ status: "active", createdAt: { $gte: startOfMonth } });

    /** 3️⃣ Nouveaux utilisateurs aujourd’hui / semaine */
    const newUsersToday = await User.countDocuments({ createdAt: { $gte: startOfToday } });
    const newUsersWeek = await User.countDocuments({ createdAt: { $gte: startOfWeek } });

    /** 4️⃣ Évolution des ventes (graphique par mois) */
    const salesByMonth = await Produit.aggregate([
      { $match: { status: "active" } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          totalVentes: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    /** 5️⃣ Catégories les plus populaires (nombre de produits) */
    const topCategories = await Produit.aggregate([
      { $match: { status: "active", id_categorie: { $ne: null } } },
      {
        $group: {
          _id: "$id_categorie",
          totalProduits: { $sum: 1 }
        }
      },
      { $sort: { totalProduits: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categorie"
        }
      },
      { $unwind: "$categorie" },
      { $project: { _id: 1, totalProduits: 1, nom: "$categorie.nom" } }
    ]);

    /** 6️⃣ Heures de trafic élevé (produits les plus vus par heure) */
    const trafficByHour = await Produit.aggregate([
      { $match: { status: "active" } },
      {
        $group: {
          _id: { $hour: "$createdAt" },
          vues: { $sum: "$vues" }
        }
      },
      { $sort: { vues: -1 } },
      { $limit: 5 } // top 5 heures
    ]);

    /** 7️⃣ Top vendeurs (utilisateurs avec le plus d'annonces actives) */
    const topSellers = await Produit.aggregate([
      { $match: { status: "active", sellerType: "particulier" } },
      { $group: { _id: "$seller", totalProduits: { $sum: 1 } } },
      { $sort: { totalProduits: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      { $project: { _id: 1, totalProduits: 1, name: "$user.name", email: "$user.email" } }
    ]);

    /** 8️⃣ Taux d’abandon d’annonce */
    const totalProducts = await Produit.countDocuments();
    const pendingProducts = await Produit.countDocuments({ status: "pending" });
    const abandonmentRate = totalProducts > 0 ? (pendingProducts / totalProducts) * 100 : 0;

    /** 9️⃣ Étude des notifications */
    const notificationsStats = await Notification.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: 1 },
          unread: { $sum: { $cond: [{ $eq: ["$state", "unread"] }, 1, 0] } },
          read: { $sum: { $cond: [{ $eq: ["$state", "read"] }, 1, 0] } }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalRevenue,
        ventes: { jour: ventesJour, semaine: ventesSemaine, mois: ventesMois },
        newUsers: { today: newUsersToday, week: newUsersWeek },
        salesByMonth,
        topCategories,
        trafficByHour,
        topSellers,
        abandonmentRate,
        notificationsStats
      }
    });

  } catch (err) {
    console.error("Erreur dashboard:", err);
    res.status(500).json({ success: false, error: "Erreur serveur lors de la récupération des statistiques" });
  }
};


// Récupérer toutes les catégories
export const getCategories = async (req, res) => {
  try {
    const categories = await Categorie.find().populate("id_thematique");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Ajouter une catégorie
export const addCategory = async (req, res) => {
  try {
    const { nom, image, id_thematique } = req.body;

    const themeExists = await Thematique.findById(id_thematique);
    if (!themeExists) return res.status(400).json({ error: "Thématique invalide" });

    const newCat = new Categorie({ nom, image, id_thematique });
    await newCat.save();

    res.status(201).json(newCat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Categorie.findByIdAndDelete(id);
    res.json({ message: "Catégorie supprimée" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Mettre à jour une catégorie
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, image, id_thematique } = req.body;
    const themeExists = await Thematique.findById(id_thematique);
    if (!themeExists) return res.status(400).json({ error: "Thématique invalide" });
    const updatedCat = await Categorie.findByIdAndUpdate(
        id,
        { nom, image, id_thematique },
        { new: true }
    );
    res.json(updatedCat);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getThematiques = async (req, res) => {
  try {
    const thematiques = await Thematique.find();
    res.json(thematiques);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  } 
};
