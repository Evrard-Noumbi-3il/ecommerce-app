// controllers/UserController.js
import Produits from "../models/Produits.js";
import User from "../models/Users.js";
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ajustez ce chemin si nécessaire (exemple : trois niveaux au-dessus)
const uploadDir = path.resolve(__dirname, '../../../frontend/public/images/user'); 


// Récupérer les infos de l'utilisateur connecté
export const getMe = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await User.findById(id).select("-password").populate("misEnVente");
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

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = `user-${req.user.id}-${Date.now()}`;
        cb(null, uniqueSuffix + ext);
    }
});

export const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }
}).single('photo');

export const updateMe = async (req, res) => {
  try {
    const userId = req.user.id; 
        
        const { name, firstname, phone, address } = req.body;
        
        const updateFields = {
            name,
            firstname,
            phonenumber: phone, // Mappage pour le schéma
            adresse: address,   // Mappage pour le schéma
        };

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true, runValidators: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

      res.status(200).json({ 
            message: "Profil mis à jour avec succès.",
            user: updatedUser
        });

    } catch (error) {
        res.status(400).json({ 
            message: "Échec de la mise à jour du profil.", 
            details: error.message 
        });
    }
};
export const updateProfilePhoto = async (req, res) => {
    try {
        const userId = req.user.id; 
        const file = req.file;
        
        if (!file) {
            return res.status(400).json({ message: "Aucun fichier d'image n'a été uploadé." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        const defaultPath = '/images/default-profile.png';
        if (user.photo && user.photo !== defaultPath) {
            const oldFilename = path.basename(user.photo);
            const oldFilePath = path.join(uploadDir, oldFilename);

            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }
        
        const newPhotoUrl = `/images/user/${file.filename}`;
        user.photo = newPhotoUrl;
        await user.save();

        res.status(200).json({
            message: "Photo de profil mise à jour avec succès.",
            photoUrl: newPhotoUrl
        });

    } catch (error) {
        res.status(500).json({ message: "Échec de l'upload de la photo.", details: error.message });
    }
};

export const addMiseEnVente = async (userId, id_produit) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Utilisateur non trouvé");
  user.misEnVente.push(id_produit);
  await user.save();
  return user;
}
  
export const getMyProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    console.log("IDs des produits mis en vente de l'utilisateur :", user.misEnVente);

    const produitsMisEnVente = await Produits.find({ _id: { $in: user.misEnVente } });

    console.log("Produits récupérés :", produitsMisEnVente); // <-- ici on voit les produits complets

    res.status(200).json(produitsMisEnVente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", details: error.message });
  }
};



export const toggleBan = async (req) => {
  const { id } = req.params
  const user = await User.findById(id);
  if (!user) throw new Error("Utilisateur non trouvé");
  user.isBan = !user.isBan
  
  await user.save()
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


  export const deleteBanUser = async (req, res) => {
  try {
    const result = await User.deleteMany({ isBan: true });
    res.status(200).json({ message: 'Utilisateurs bannis supprimés', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const togglePromote = async (req) => {
  const { id } = req.params
  const user = await User.findById(id);
  if (!user) throw new Error("Utilisateur non trouvé");
  user.role = user.role == 'admin' ? 'moderator': 'admin'
  
  await user.save()
}