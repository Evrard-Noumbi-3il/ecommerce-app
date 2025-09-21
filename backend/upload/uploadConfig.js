import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/public/images/categories'); // dossier de destination
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nomFichier = `${Date.now()}-${file.originalname}`;
    cb(null, nomFichier);
  }
});

export const upload = multer({ storage });