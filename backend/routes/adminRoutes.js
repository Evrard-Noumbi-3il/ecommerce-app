import express from "express";
import { authMiddleware, isModeratorOrAdmin } from "../middleware/auth.js";
import { getAllUsers, updateUserRole, deleteUser, getStats, getThematiques } from "../controllers/adminController.js";
import { getReportedProducts, validateProduct, deleteProduct } from "../controllers/moderationController.js";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

router.get("/reported-products", getReportedProducts);
router.put("/products/:id/validate", authMiddleware, isModeratorOrAdmin, validateProduct);
router.delete("/products/:id", authMiddleware, isModeratorOrAdmin, deleteProduct);

router.get("/stats", getStats);

router.get("/categories", getCategories);
router.post("/categories", addCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

router.get("/thematiques", getThematiques);
export default router;
