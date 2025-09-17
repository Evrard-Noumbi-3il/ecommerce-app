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
  { nom: "Immobilier", image: "/images/thematique/immobilier.jpg", nbrFoisRecherché: 120 },
  { nom: "Véhicules", image: "/images/thematique/vehicules.jpg", nbrFoisRecherché: 95 },
  { nom: "Multimédia", image:"/images/thematique/multimédia.jpg" , nbrFoisRecherché: 80 },
  { nom: "Maison", image:"/images/thematique/maison.jpg", nbrFoisRecherché: 60 },
  { nom: "Loisirs", image:"/images/thematique/loisirs.jpg", nbrFoisRecherché: 45 },
  { nom: "Mode", image:"/images/thematique/mode.jpg", nbrFoisRecherché: 70 },
  { nom: "Électroménager", image:"/images/thematique/electromenager.jpg", nbrFoisRecherché: 55 },
]);

console.log("✅ Thématiques insérées");

// Insérer catégories
const categories = await Categorie.insertMany([
  // Immobilier
  { nom: "Appartements", image: "/images/categories/appartements.jpg", id_thematique: thematiques[0]._id },
  { nom: "Maisons", image: "/images/categories/maisons.jpg", id_thematique: thematiques[0]._id },
  { nom: "Terrains", image: "/images/categories/terrains.jpg", id_thematique: thematiques[0]._id },

  // Véhicules
  { nom: "Voitures", image: "/images/categories/voitures.jpg", id_thematique: thematiques[1]._id },
  { nom: "Motos", image: "/images/categories/motos.jpg", id_thematique: thematiques[1]._id },
  { nom: "Vélos", image: "/images/categories/velos.jpg", id_thematique: thematiques[1]._id },

  // Multimédia
  { nom: "Informatique", image: "/images/categories/informatique.jpg", id_thematique: thematiques[2]._id },
  { nom: "Téléphonie", image: "/images/categories/telephonie.jpg", id_thematique: thematiques[2]._id },
  { nom: "Gaming", image: "/images/categories/gaming.jpg", id_thematique: thematiques[2]._id },
  { nom: "Photo & Vidéo", image: "/images/categories/photo-video.jpg", id_thematique: thematiques[2]._id },

  // Maison
  { nom: "Meubles", image: "/images/categories/meubles.jpg", id_thematique: thematiques[3]._id },
  { nom: "Décoration", image: "/images/categories/decoration.jpg", id_thematique: thematiques[3]._id },
  { nom: "Jardinage", image: "/images/categories/jardinage.jpg", id_thematique: thematiques[3]._id },

  // Loisirs
  { nom: "Sport", image: "/images/categories/sport.jpg", id_thematique: thematiques[4]._id },
  { nom: "Musique", image: "/images/categories/musique.jpg", id_thematique: thematiques[4]._id },
  { nom: "Livres", image: "/images/categories/livres.jpg", id_thematique: thematiques[4]._id },

  // Mode
  { nom: "Vêtements", image: "/images/categories/vetements.jpg", id_thematique: thematiques[5]._id },
  { nom: "Chaussures", image: "/images/categories/chaussures.jpg", id_thematique: thematiques[5]._id },
  { nom: "Accessoires", image: "/images/categories/accessoires.jpg", id_thematique: thematiques[5]._id },

  // Électroménager
  { nom: "Cuisine", image: "/images/categories/cuisine.jpg", id_thematique: thematiques[6]._id },
  { nom: "Lavage", image: "/images/categories/lavage.jpg", id_thematique: thematiques[6]._id },
  { nom: "Climatisation", image: "/images/categories/climatisation.jpg", id_thematique: thematiques[6]._id },
]);

console.log("✅ Catégories insérées");


    // Insérer produits
const produits = await Produit.insertMany([
  {
    titre: "MacBook Pro 2022",
    description: "Ordinateur portable puissant pour développeurs",
    prix: 1800,
    location: "Paris",
    state: "occasion",
    sellerType: "professionnel",
    image: "/images/produits/macbook.jpg",
    id_categorie: categories.find(cat => cat.nom === "Informatique")._id,
    theme: "Informatique",
    vues: 120,
    date: new Date("2023-11-01"),
  },
  {
    titre: "Voiture Peugeot 208",
    description: "Bonne occasion, faible kilométrage",
    prix: 9500,
    location: "Lyon",
    state: "occasion",
    sellerType: "particulier",
    image: "/images/produits/peugeot208.jpg",
    id_categorie: categories.find(cat => cat.nom === "Voitures")._id,
    theme: "Automobile",
    vues: 300,
    date: new Date("2023-10-25"),
  },
  {
    titre: "Canapé 3 places",
    description: "Confortable et moderne, parfait pour salon",
    prix: 300,
    location: "Marseille",
    state: "occasion",
    sellerType: "particulier",
    image: "/images/produits/canape.jpg",
    id_categorie: categories.find(cat => cat.nom === "Meubles")._id,
    theme: "Mobilier",
    vues: 85,
    date: new Date("2023-10-20"),
  },
  {
    titre: "iPhone 14 Pro Max",
    description: "Smartphone Apple dernière génération, état impeccable",
    prix: 1200,
    location: "Bordeaux",
    state: "neuf",
    sellerType: "professionnel",
    image: "/images/produits/iphone14.jpg",
    id_categorie: categories.find(cat => cat.nom === "Téléphonie")._id,
    theme: "Téléphonie",
    vues: 450,
    date: new Date("2023-11-05"),
  },
  {
    titre: "Vélo électrique Decathlon",
    description: "Idéal pour trajets urbains, autonomie 80km",
    prix: 800,
    location: "Toulouse",
    state: "occasion",
    sellerType: "particulier",
    image: "/images/produits/velo.jpg",
    id_categorie: categories.find(cat => cat.nom === "Vélos")._id,
    theme: "Mobilité douce",
    vues: 210,
    date: new Date("2023-09-18"),
  },
  {
    titre: "Table en bois massif",
    description: "Table à manger 6 personnes, style moderne",
    prix: 450,
    location: "Nice",
    state: "occasion",
    sellerType: "particulier",
    image: "/images/produits/table.jpg",
    id_categorie: categories.find(cat => cat.nom === "Meubles")._id,
    theme: "Mobilier",
    vues: 60,
    date: new Date("2023-09-10"),
  },
  {
    titre: "PS5 + 2 manettes",
    description: "Console Sony PlayStation 5 avec 2 manettes et 3 jeux",
    prix: 650,
    location: "Paris",
    state: "occasion",
    sellerType: "particulier",
    image: "/images/produits/ps5.jpg",
    id_categorie: categories.find(cat => cat.nom === "Gaming")._id,
    theme: "Gaming",
    vues: 780,
    date: new Date("2023-11-08"),
  },
  {
    titre: "Appareil photo Canon EOS R",
    description: "Appareil photo hybride professionnel avec objectif 24-105mm",
    prix: 2100,
    location: "Lille",
    state: "neuf",
    sellerType: "professionnel",
    image: "/images/produits/canon.jpg",
    id_categorie: categories.find(cat => cat.nom === "Photo & Vidéo")._id,
    theme: "Photographie",
    vues: 150,
    date: new Date("2023-08-22"),
  },
  {
    titre: "Chaussures Nike Air Max",
    description: "Sneakers tendance, taille 42, état neuf",
    prix: 120,
    location: "Strasbourg",
    state: "neuf",
    sellerType: "particulier",
    image: "/images/produits/nike.jpg",
    id_categorie: categories.find(cat => cat.nom === "Chaussures")._id,
    theme: "Chaussures",
    vues: 95,
    date: new Date("2023-11-03"),
  },
  {
    titre: "Livre : L’art de la guerre",
    description: "Édition reliée, excellent état",
    prix: 15,
    location: "Rennes",
    state: "occasion",
    sellerType: "particulier",
    image: "/images/produits/livre.jpg",
    id_categorie: categories.find(cat => cat.nom === "Livres")._id,
    theme: "Livres",
    vues: 40,
    date: new Date("2023-07-30"),
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
