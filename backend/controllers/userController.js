// controllers/UserController.js
import User from "../models/Users.js";

// Récupérer les infos de l'utilisateur connecté
export const getMe = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Erreur serveur" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
//methode pour recuperer les annonces d'un utilisateur connecte
export const getAllAnnoncesByUser = async (req, res) => { }

export const updateMe = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate('Produit');
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phonenumber: phone }),
        ...(address && { adresse: address })
      },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const addMiseEnVente = async (req, res) => {
  try {
    const token
    const { id_produit, id } = req.body;
    const user = await User.findById(id);
    user.misEnVente.push(id_produit);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}
