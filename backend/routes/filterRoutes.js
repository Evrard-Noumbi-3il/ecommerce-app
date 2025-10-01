import express from "express";
import { getProducts, getCategories,getProductCategory, getThematiques, getProductById,getUserByIdProduct } from "../controllers/filterController.js";

import { addProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/user/:id", getUserByIdProduct);    
router.get("/thematiques", getThematiques);
router.post("/addProduct", addProduct);
router.get("/categories", getCategories);
router.get("/category/:id", getProductCategory)
router.get("/:id", getProductById);
router.get("/", getProducts);
 
export default router;
