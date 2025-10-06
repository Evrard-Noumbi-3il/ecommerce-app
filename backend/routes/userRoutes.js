import express from "express";
//import { updateMe, getMe } from "../controllers/UserController.js";

const router = express.Router();

// Middleware JSON global ou sur cette route
router.use(express.json());

// Exemple de route update
router.put("/me", updateMe);
router.get("/me/:id", getMe);
router.get("/me/produits/:id", getAllAnnoncesByUser);

export default router;
