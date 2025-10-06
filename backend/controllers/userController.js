// controllers/UserController.js
import User from "../models/Users.js";

// Récupérer les infos de l'utilisateur connecté
export const getMe = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({message: "Erreur serveur"});
    }

    res.json(user);  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
//methode pour recuperer les annonces d'un utilisateur connecte 
export const getAllAnnoncesByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate('Produit');
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user.produits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};