import multer from "multer";
import path from "path";
import fs from "fs";

// 📌 On définit un chemin absolu vers le dossier d’upload
const uploadPath = path.resolve("../frontend/public/images/produits");

// 📁 Si le dossier n’existe pas, on le crée
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// 📦 Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

// 🛡️ Filtrage des fichiers
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format d’image non supporté ❌"), false);
  }
};

// 🚀 Export du middleware multer
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo max par image
});
