import Product from "../models/Produits.js";
import Notifications from "../models/Notifications.js";
import User from "../models/Users.js";

export const getReportedProducts = async (req, res) => {
  try {
    const products = await Product.find({ signale: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const toggleStateProduct = async (req, res) => {
  try {
    const produit = await Product.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    )
    if(produit.status == 'rejected'){
      const message = (`Votre produit "${produit.titre}" a été rejeté par un modérateur. Veuillez vérifier les raisons du rejet et apporter les modifications nécessaires avant de le soumettre à nouveau.`)
      const user = await User.findOne({misEnVente: produit._id});
      const newNotification = new Notifications({ message : message, target : user._id , from : "moderator"});
      await newNotification.save();
    }

    res.json(produit)
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Erreur de mise à jour' })
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Produit non trouvé" });

    res.json({ message: "Produit supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression du produit:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch(err){
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};