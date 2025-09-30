import Product from "../models/Produits.js";
import Category from "../models/Categorie.js";
import Thematique from "../models/Thematique.js";

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(req.params);
    if (!product) return res.status(404).json({ error: "Produit non trouvé" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export const getProducts = async (req, res) => {
  try {
    const {
      category,
      theme,
      priceMin,
      priceMax,
      location,
      state,
      postedWithin,
      sellerType,
      sortBy,
      page = 1,
      limit = 20,
      q, // recherche texte
    } = req.query;

    const query = {};

    // 🔹 Catégorie
    if (category) {
      query.id_categorie = category;
    }

    // 🔹 Thématique
    if (theme) {
      const categories = await Category.find({ id_thematique: theme }).select("_id");
      query.id_categorie = { $in: categories.map((c) => c._id) };
    }

    // 🔹 État (neuf/occasion)
    if (state) query.state = state;

    // 🔹 Type vendeur
    if (sellerType) query.sellerType = sellerType;

    // 🔹 Prix
    if (priceMin || priceMax) {
      query.prix = {};
      if (priceMin) query.prix.$gte = Number(priceMin);
      if (priceMax) query.prix.$lte = Number(priceMax);
    }

    // 🔹 Recherche texte
    if (q) {
      query.$or = [
        { titre: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    // 🔹 Date (filtrer par jours)
    if (postedWithin) {
      const date = new Date();
      date.setDate(date.getDate() - Number(postedWithin));
      query.date = { $gte: date };
    }

    // 🔹 Localisation (simplifiée avec regex)
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // 🔹 Tri
    let sort = { date: -1 }; // par défaut "récent"
    if (sortBy === "priceAsc") sort = { prix: 1 };
    else if (sortBy === "priceDesc") sort = { prix: -1 };
    else if (sortBy === "popular") sort = { vues: -1 };

    // 🔹 Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query).sort(sort).skip(skip).limit(Number(limit)),
      Product.countDocuments(query),
    ]);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      results: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
export const getThematiques = async (req, res) => {
  try {
    const thematiques = await Thematique.find();
    res.json(thematiques);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};