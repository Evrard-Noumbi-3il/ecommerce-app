import express from "express";
import { 
  getMe, 
  updateMe, 
  addMiseEnVente, 
  updateProfilePhoto,   // 🔹 Bien l’importer
} from "../controllers/userController.js";
import { authenticateToken } from '../middleware/auth.js';
import uploadUser from "../middleware/uploadUser.js";

const router = express.Router();

router.get("/me/:id", authenticateToken, getMe);           // user connecté
router.put('/me', authenticateToken, updateMe); 

// Patch pour upload de photo
router.patch('/me/photo', authenticateToken, uploadUser.single("photo"), updateProfilePhoto);

router.post("/addMiseEnVente", authenticateToken, addMiseEnVente); // protéger avec token

export default router;
