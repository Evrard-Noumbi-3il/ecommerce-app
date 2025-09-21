import User from "../models/Users.js";
import Produit from "../models/Produits.js";
import Categorie from "../models/Categorie.js";
import Thematique from "../models/Thematique.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
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

export const getStats = async (req, res) => {
  try {
    // Comptage général
    const usersCount = await User.countDocuments();
    const productsCount = await Produit.countDocuments();
    const reportedCount = await Produit.countDocuments({ reported: true }); // si tu as un champ reported

    // Pour le graphique : nombre de produits publiés par jour sur 7 jours
    const today = new Date();
    const chart = { labels: [], values: [] };
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(today.getDate() - i);
      const start = new Date(day.setHours(0,0,0,0));
      const end = new Date(day.setHours(23,59,59,999));
      const count = await Produit.countDocuments({ date: { $gte: start, $lte: end } });
      chart.labels.push(start.toLocaleDateString('fr-FR'));
      chart.values.push(count);
    }

    res.json({
      users: usersCount,
      products: productsCount,
      reported: reportedCount,
      chart
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
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