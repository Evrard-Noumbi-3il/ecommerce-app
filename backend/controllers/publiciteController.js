import Publicite from "../models/Publicite.js";

// ➤ Récupérer toutes les publicités
export const getAllPublicites = async (req, res) => {
  try {
    const pubs = await Publicite.find().lean();

    const formatted = pubs.map((pub) => ({
      ...pub,
      image: pub.image
        ,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Erreur récupération publicités:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ➤ Ajouter une publicité
export const createPublicite = async (req, res) => {
  try {
    const { titre, information } = req.body;

    const existingPub = await Publicite.findOne({ titre: titre.trim() });
    if (existingPub) {
      return res.status(400).json({ error: "Une publicité avec ce titre existe déjà" });
    }

    const imagePath = req.file
      ? `/images/publicites/${req.file.filename}`
      : "/images/publicites/default.png";

    const newPub = new Publicite({
      titre,
      information,
      image: imagePath,
    });

    await newPub.save();

    res.status(201).json(newPub);
  } catch (err) {
    console.error("Erreur ajout publicité:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ➤ Récupérer une publicité par ID
export const getPubliciteById = async (req, res) => {
  try {
    const pub = await Publicite.findById(req.params.id).lean();

    if (!pub) {
      return res.status(404).json({ error: "Publicité non trouvée" });
    }

    res.json({
      ...pub,
      image: pub.image
        ,
    });
  } catch (err) {
    console.error("Erreur récupération publicité:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ➤ Mettre à jour une publicité
export const updatePublicite = async (req, res) => {
  try {
    const { titre, information } = req.body;

    const pub = await Publicite.findById(req.params.id);
    if (!pub) {
      return res.status(404).json({ error: "Publicité non trouvée" });
    }

    const imagePath = req.file
      ? `../frontend/public/images/publicites/${req.file.filename}`
      : pub.image;

    pub.titre = titre || pub.titre;
    pub.information = information || pub.information;
    pub.image = imagePath;

    await pub.save();

    res.json(pub);
  } catch (err) {
    console.error("Erreur mise à jour publicité:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ➤ Supprimer une publicité
export const deletePublicite = async (req, res) => {
  try {
    const pub = await Publicite.findByIdAndDelete(req.params.id);

    if (!pub) {
      return res.status(404).json({ error: "Publicité non trouvée" });
    }

    res.json({ message: "Publicité supprimée avec succès" });
  } catch (err) {
    console.error("Erreur suppression publicité:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
