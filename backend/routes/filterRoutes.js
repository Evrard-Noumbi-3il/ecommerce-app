import express from "express";
import { getProducts, getCategories, getThematiques, getProductById } from "../controllers/filterController.js";
import { getProducts, getCategories, getThematiques } from "../controllers/filterController.js";
import { addProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/categories", getCategories);
router.get("/thematiques", getThematiques);
router.post('/addProduct', addProduct);

export default router;
