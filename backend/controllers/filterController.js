import Product from "../models/Produits.js";

export const getProducts = async (req, res) => {
  try {
    const {
      category,
      theme,
      priceMin,
      priceMax,
      location,
      radius,
      state,
      postedWithin,
      sellerType,
      sortBy,
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (theme) query.theme = theme;
    if (state) query.state = state;
    if (sellerType) query.sellerType = sellerType;

    // Prix
    if (priceMin || priceMax) {
      query.prix = {};
      if (priceMin) query.prix.$gte = Number(priceMin);
      if (priceMax) query.prix.$lte = Number(priceMax);
    }

    // Date (filtrer par jours)
    if (postedWithin) {
      const date = new Date();
      date.setDate(date.getDate() - Number(postedWithin));
      query.date = { $gte: date };
    }

    // ⚠ Localisation simplifiée (juste "contient")
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    let products = await Product.find(query);

    // Tri
    if (sortBy === "priceAsc") {
      products = products.sort((a, b) => a.prix - b.prix);
    } else if (sortBy === "priceDesc") {
      products = products.sort((a, b) => b.prix - a.prix);
    } else if (sortBy === "recent") {
      products = products.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "popular") {
      products = products.sort((a, b) => b.vues - a.vues);
    }

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
