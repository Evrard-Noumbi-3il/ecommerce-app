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
export const updateMe = async (req, res) => {
  try {
    // 🔹 Debug : pour voir ce que le frontend envoie
    console.log("Body reçu :", req.body);

    const { name, email, phone, address } = req.body;

    if (!name && !email && !phone && !address) {
      return res.status(400).json({ message: "Aucune donnée reçue pour mise à jour" });
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
    console.error("Erreur updateMe :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};