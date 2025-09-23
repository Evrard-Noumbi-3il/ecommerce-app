import express from "express";
import { getProducts, getCategories, getThematiques } from "../controllers/filterController.js";
import { addProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/thematiques", getThematiques);
router.post('/addProduct', addProduct);

export default router;
