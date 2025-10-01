import express from "express";
import { getCategories, getCategoryById } from "../controllers/categoryController.js";

const router = express.Router(); 

router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);

export default router;

