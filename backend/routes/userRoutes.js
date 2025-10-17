import express from "express";
import { 
  getMe, 
  updateMe, 
  addMiseEnVente, 
  updateProfilePhoto,// 🔹 Bien l’importer
  getMyProducts
} from "../controllers/userController.js";
import { getUserNotifications } from "../controllers/notificationController.js";
import { authenticateToken } from '../middleware/auth.js';
import uploadUser from "../middleware/uploadUser.js";

const router = express.Router();

router.get("/me/:id", authenticateToken, getMe);           
router.put('/me', authenticateToken, updateMe); 

// Patch pour upload de photo
router.patch('/me/photo', authenticateToken, uploadUser.single("photo"), updateProfilePhoto);

router.post("/addMiseEnVente",addMiseEnVente); 
//router.get("/users/:id/products", getMyProducts);
router.get("/notifications/:id", authenticateToken, getUserNotifications);
router.get("/users/:userId/products", authenticateToken, getMyProducts);




export default router;
