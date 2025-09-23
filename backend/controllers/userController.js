// controllers/UserController.js
import User from "../models/Users.js";

// Récupérer les infos de l'utilisateur connecté
export const getMe = async (req, res) => {
  try {
    res.json(req.user);  // req.user est rempli par authMiddleware
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Modifier les infos de l'utilisateur connecté
export const updateMe = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, phonenumber: phone, adresse: { rue: address } },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
