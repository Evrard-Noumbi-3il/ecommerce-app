import multer from "multer";
import path from "path";
import fs from "fs";

// Définition du dossier d’upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join("../frontend/public/images/publicites");

    // Si le dossier n’existe pas, on le crée
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Filtre pour accepter uniquement les images
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format d’image non supporté"), false);
  }
};

const uploadPub = multer({ storage, fileFilter });

export default uploadPub;
