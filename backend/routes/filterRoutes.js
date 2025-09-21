import express from "express";
import { getProducts, getCategories, getThematiques } from "../controllers/filterController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/thematiques", getThematiques);

export default router;
