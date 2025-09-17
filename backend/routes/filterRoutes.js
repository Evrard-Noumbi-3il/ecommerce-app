import express from "express";
import { getProducts } from "../controllers/filterController.js";

const router = express.Router();

// GET /api/products?category=Mode&priceMin=10&priceMax=100&location=Paris&state=neuf
router.get("/", getProducts);

export default router;
