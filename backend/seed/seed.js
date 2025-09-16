import mongoose from "mongoose";
import dotenv from "dotenv";

import Publicite from "../models/Publicite.js";
import Thematique from "../models/Thematique.js";
import Categorie from "../models/Categorie.js";
import Produit from "../models/Produits.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connecté à MongoDB Atlas");

    // Vider les collections
    await Publicite.deleteMany();
    await Thematique.deleteMany();
    await Categorie.deleteMany();
    await Produit.deleteMany();

    console.log("🗑️ Collections vidées");

    // Insérer thématiques
    const thematiques = await Thematique.insertMany([
      { nom: "Immobilier", nbrFoisRecherché: 120 },
      { nom: "Véhicules", nbrFoisRecherché: 95 },
      { nom: "Multimédia", nbrFoisRecherché: 80 },
      { nom: "Maison", nbrFoisRecherché: 60 },
      { nom: "Loisirs", nbrFoisRecherché: 45 },
    ]);

    console.log("✅ Thématiques insérées");

    // Insérer catégories
    const categories = await Categorie.insertMany([
      { nom: "Appartements", image: "/images/categories/appartements.jpg", id_thematique: thematiques[0]._id },
      { nom: "Voitures", image: "/images/categories/voitures.jpg", id_thematique: thematiques[1]._id },
      { nom: "Informatique", image: "/images/categories/informatique.jpg", id_thematique: thematiques[2]._id },
      { nom: "Meubles", image: "/images/categories/meubles.jpg", id_thematique: thematiques[3]._id },
      { nom: "Sport", image: "/images/categories/sport.jpg", id_thematique: thematiques[4]._id },
    ]);

    console.log("✅ Catégories insérées");

    // Insérer produits
    const produits = await Produit.insertMany([
      {
        nom: "MacBook Pro 2022",
        description: "Ordinateur portable puissant pour développeurs",
        prix: 1800,
        localisation: "Paris",
        etat: "Comme neuf",
        images: ["/images/produits/macbook.jpg"],
        id_categorie: categories[2]._id,
      },
      {
        nom: "Voiture Peugeot 208",
        description: "Bonne occasion, faible kilométrage",
        prix: 9500,
        localisation: "Lyon",
        etat: "Bon état",
        images: ["/images/produits/peugeot208.jpg"],
        id_categorie: categories[1]._id,
      },
      {
        nom: "Canapé 3 places",
        description: "Confortable et moderne",
        prix: 300,
        localisation: "Marseille",
        etat: "Très bon état",
        images: ["/images/produits/canape.jpg"],
        id_categorie: categories[3]._id,
      },
    ]);

    console.log("✅ Produits insérés");

    // Insérer publicités
    await Publicite.insertMany([
      { titre: "Promo Été", information: "Réductions sur l'électroménager", image: "/images/publicites/pub1.jpg" },
      { titre: "Nouveautés auto", information: "Découvrez les derniers modèles", image: "/images/publicites/pub2.jpg" },
      { titre: "Offres Immo", information: "Appartements à prix réduits", image: "/images/publicites/pub3.jpg" },
      { titre: "Tech Deals", information: "Gadgets à ne pas manquer", image: "/images/publicites/pub4.jpg" },
      { titre: "Mobilier Design", information: "Meubles modernes en promo", image: "/images/publicites/pub5.jpg" },
    ]);

    console.log("✅ Publicités insérées");

    console.log("🎉 Base de données initialisée avec succès !");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur seed :", err);
    process.exit(1);
  }
};

seedDatabase();
