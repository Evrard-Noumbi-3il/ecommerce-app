// controllers/UserController.js
import Produits from "../models/Produits.js";
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
}
  
  export const getFavoris = async (req, res) => {
    try {
      const {id} = req.params; 
      

      const user = await User.findById(id); 
      if(!user){
        return res.status(404).json({message : "Favoris de cet utilisateur non trouvé"}); 
      }

      const favoris =  user.favoris;

      if (favoris.length == 0){
        return res.status(200).json({ message : " Aucun produits en favoris pour cet utilisateur "}); 
      }

      const produits = await Produits.find({ _id: { $in: favoris } })

      console.log(produits)
      return res.status(200).json({
        message : "Produits récupérés avec succèss" ,
        produits : produits
      }) ; 
    } catch(err) {
      console.log(err); 
      console.error("Erreur lors de la récupération des produits :" , err);
      res.status(500).json({message: "Erreur serveur"}); 
    }
 

  }