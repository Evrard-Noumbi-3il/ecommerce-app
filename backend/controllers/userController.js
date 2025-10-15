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

export const addMiseEnVente = async (userId, id_produit) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Utilisateur non trouvé");
  user.misEnVente.push(id_produit);
  await user.save();
  return user;
};

export const toggleBan = async (req) => {
  const { id } = req.params
  const user = await User.findById(id);
  if (!user) throw new Error("Utilisateur non trouvé");
  user.isBan = !user.isBan
  
  await user.save()
}

export const deleteBanUser = async (req, res) => {
  try {
    const result = await User.deleteMany({ isBan: true });
    res.status(200).json({ message: 'Utilisateurs bannis supprimés', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const togglePromote = async (req) => {
  const { id } = req.params
  const user = await User.findById(id);
  if (!user) throw new Error("Utilisateur non trouvé");
  user.role = user.role == 'admin' ? 'moderator': 'admin'
  
  await user.save()
}