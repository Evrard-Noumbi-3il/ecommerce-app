import express from "express";
import { getProducts, getCategories, getThematiques, getProductById } from "../controllers/filterController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/categories", getCategories);
router.get("/thematiques", getThematiques);

export default router;
