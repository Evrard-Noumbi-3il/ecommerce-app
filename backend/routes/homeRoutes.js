import express from "express";
import {
  getPublicites,
  getTendances,
  getCategories,
  getNouveauxProduits,
  getThematiques,
} from "../controllers/homeController.js";

const router = express.Router();

router.get("/publicites", getPublicites);

router.get("/tendances", getTendances);

router.get("/categories", getCategories);

router.get("/nouveautes", getNouveauxProduits);

router.get("/thematiques", getThematiques);

export default router;
