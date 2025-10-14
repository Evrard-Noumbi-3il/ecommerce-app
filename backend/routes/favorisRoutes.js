// routes/favorisRoutes.js
import express from "express";
import {
  getFavorisProduits,
  getThematiques,
  getCategories,
  addFavori,
} from "../controllers/FavorisController.js";

const router = express.Router();

router.get("/produits", getFavorisProduits );
router.get("/thematiques", getThematiques);
router.get("/categories", getCategories);
router.post("/addFavori", addFavori);

export default router;
