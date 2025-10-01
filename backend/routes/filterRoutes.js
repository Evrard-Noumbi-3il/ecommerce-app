import express from "express";
import { getProducts, getCategories, getThematiques, getProductById,getUserByIdProduct } from "../controllers/filterController.js";

import { addProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/user/:id", getUserByIdProduct);    
router.get("/categories", getCategories);
router.get("/thematiques", getThematiques);
router.post("/addProduct", addProduct);
router.get("/:id", getProductById);
router.get("/", getProducts);

export default router;
