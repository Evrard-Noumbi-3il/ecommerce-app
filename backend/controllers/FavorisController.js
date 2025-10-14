import Favoris from "../models/Favoris.js";

// Récupération des produits mis en favoris 
export const getFavorisProduits = async (req, res) => {
  try {
    const produits = await Favoris.find({ type: "produit" });
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Récupération des thématiques mis en favoris
export const getThematiques = async (req, res) => {
  try {
    const thematiques = await Thematique.find();
    res.json(thematiques);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupération des catégories mis en favoris
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ajout d'un produit dépuis catégories
export const addFavori = async(req , res) => {
    try {
        const {id_produit, id} = req.body; 
        const prod = await Favoris.findByID(id); 
        prod.addProduits.push(id_produit); 
    }
    catch(err) {
        res.status(500).json( {message : "Erreur serveur"})
    }
}
