import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/Users.js";
import Publicite from "../models/Publicite.js";
import Thematique from "../models/Thematique.js";
import Categorie from "../models/Categorie.js";
import Produit from "../models/Produits.js";

dotenv.config();

const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connecté à MongoDB Atlas");

    // Vider les collections
    await Publicite.deleteMany();
    await Thematique.deleteMany();
    await Categorie.deleteMany();
    await Produit.deleteMany();
    await User.deleteMany();

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
    images: ["/images/produits/macbook.jpg"], // tableau d'images
    id_categorie: categories.find(cat => cat.nom === "Informatique")._id,
    theme: thematiques.find(t => t.nom === "Multimédia").nom,
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
    images: ["/images/produits/peugeot208.jpg"], // tableau d'images
    id_categorie: categories.find(cat => cat.nom === "Voitures")._id,
    theme: thematiques.find(t => t.nom === "Véhicules").nom,
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
    images: ["/images/produits/canape.jpg"],
    id_categorie: categories.find(cat => cat.nom === "Meubles")._id,
    theme: thematiques.find(t => t.nom === "Immobilier").nom,
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
    images: ["/images/produits/iphone14.jpg"],
    id_categorie: categories.find(cat => cat.nom === "Téléphonie")._id,
    theme: thematiques.find(t => t.nom === "Multimédia").nom,
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
    images: ["/images/produits/velo.jpg"],
    id_categorie: categories.find(cat => cat.nom === "Vélos")._id,
    theme: thematiques.find(t => t.nom === "Véhicules").nom,
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
    images: ["/images/produits/table.jpg"],
    id_categorie: categories.find(cat => cat.nom === "Meubles")._id,
    theme: thematiques.find(t => t.nom === "Maison").nom,
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
    images: ["/images/produits/ps5.jpg"],
    id_categorie: categories.find(cat => cat.nom === "Gaming")._id,
    theme: thematiques.find(t => t.nom === "Multimédia").nom,
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
    images: ["/images/produits/canon.jpg"],
    id_categorie: categories.find(cat => cat.nom === "Photo & Vidéo")._id,
    theme: thematiques.find(t => t.nom === "Multimédia").nom,
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
    images: ["/images/produits/nike.jpg"],
    id_categorie: categories.find(cat => cat.nom === "Chaussures")._id,
    theme: thematiques.find(t => t.nom === "Mode").nom,
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
    images: ["/images/produits/livre.jpg"],
    id_categorie: categories.find(cat => cat.nom === "Livres")._id,
    theme: thematiques.find(t => t.nom === "Loisirs").nom,
    vues: 40,
    date: new Date("2023-07-30"),
  },
]);

    console.log("✅ Produits insérés");

   // Insérer publicités
await Publicite.insertMany([
  { 
    titre: "Promo Été",
    information: "Réductions jusqu'à -50% sur l'électroménager",
    image: "/images/publicites/pub1.jpg"
  },
  { 
    titre: "Nouveautés Auto",
    information: "Découvrez les derniers modèles hybrides et électriques",
    image: "/images/publicites/pub2.jpg"
  },
  { 
    titre: "Offres Immo",
    information: "Appartements et maisons à prix réduits partout en France",
    image: "/images/publicites/pub3.jpg"
  },
  { 
    titre: "Tech Deals",
    information: "Smartphones, PC et gadgets à prix cassés cette semaine",
    image: "/images/publicites/pub4.jpg"
  },
  { 
    titre: "Mobilier Design",
    information: "Meubles modernes en promo - livraison gratuite",
    image: "/images/publicites/pub5.jpg"
  },
  { 
    titre: "Mode & Accessoires",
    information: "Nouvelles collections printemps-été",
    image: "/images/publicites/pub6.jpg"
  },
  { 
    titre: "Sport & Loisirs",
    information: "Équipements sportifs à prix mini",
    image: "/images/publicites/pub7.jpg"
  },
  { 
    titre: "Voyages",
    information: "Séjours et billets d’avion à prix réduit",
    image: "/images/publicites/pub8.jpg"
  },
  ]);
  console.log("✅ Publicités insérées");

    // Insérer utilisateurs
    const users = [
    {
      name: "Admin",
      firstname: "Admin",
      phonenumber: "0600000001",
      email: "admin@admin.com",
      password: await hashPassword("admin"), 
      role: "admin",
      adresse: {
        rue: "10 Rue de Rivoli",
        ville: "Paris",
        codePostal: "75001",
        pays: "France",
      },
    },
    {
      name: "Moderator",
      firstname: "Moderator",
      phonenumber: "0600000002",
      email: "moderator@Moderator.com",
      password: await hashPassword("moderator"),
      role: "moderator",
      adresse: {
        rue: "15 Avenue Foch",
        ville: "Lyon",
        codePostal: "69000",
        pays: "France",
      },
    },
    {
      name: "Martin",
      firstname: "Lucas",
      phonenumber: "0600000003",
      email: "user@test.com",
      password: await hashPassword("user123"),
      role: "user",
      adresse: {
        rue: "20 Rue de la République",
        ville: "Marseille",
        codePostal: "13000",
        pays: "France",
      },
    },
  ];

  await User.insertMany(users);

  console.log("✅ Utilisateurs de test insérés avec succès !");

    console.log("🎉 Base de données initialisée avec succès !");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur seed :", err);
    process.exit(1);
  }
};

seedDatabase();
