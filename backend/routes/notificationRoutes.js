import express from "express";
import { getUserNotifications } from "../controllers/notificationController.js";

const router = express.Router();

// Route pour récupérer les notifications d’un utilisateur
router.get("/:userId", getUserNotifications);

export default router;
