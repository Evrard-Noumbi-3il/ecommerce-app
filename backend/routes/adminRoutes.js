import express from "express";
import { authMiddleware,isAdmin, isModeratorOrAdmin } from "../middleware/auth.js";
import upload from "../middleware/uploadThematique.js";
import uploadPub from "../middleware/uploadPublicite.js";
import { getAllUsers, updateUserRole, deleteUser, getStats } from "../controllers/adminController.js";
import { getReportedProducts, validateProduct, deleteProduct, getProducts } from "../controllers/moderationController.js";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { getNotificationsSentByModerator, sendNotification} from "../controllers/notificationController.js";
import { addThematique, getThematiques, getThematiqueById, updateThematique, deleteThematique, } from "../controllers/thematiqueController.js";
import {  getAllPublicites,  createPublicite, getPubliciteById, updatePublicite,  deletePublicite,} from "../controllers/publiciteController.js";

const router = express.Router();

// 🔐 Admin only
router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.put("/users/:id/role", authMiddleware, isAdmin, updateUserRole);
router.delete("/users/:id", authMiddleware, isAdmin, deleteUser);
router.get("/stats", authMiddleware, isAdmin, getStats);

// 🔐 Moderator or Admin
router.get("/reported-products", authMiddleware, isModeratorOrAdmin, getReportedProducts);
router.put("/products/:id/validate", authMiddleware, isModeratorOrAdmin, validateProduct);

router.get("/products", authMiddleware, isModeratorOrAdmin, getProducts);
router.delete("/products/:id", authMiddleware, isModeratorOrAdmin, deleteProduct);

// 🔐 Authenticated users (e.g., admin/moderator)
router.get("/categories", authMiddleware, getCategories);
router.post("/categories", authMiddleware, isAdmin, addCategory);
router.put("/categories/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/categories/:id", authMiddleware, isAdmin, deleteCategory);

router.post("/thematiques", authMiddleware, isAdmin, upload.single("image"), addThematique);
router.get("/thematiques", authMiddleware, getThematiques);
router.get("/thematiques/:id", authMiddleware, getThematiqueById);
router.put("/thematiques/:id", authMiddleware, isAdmin, upload.single("image"), updateThematique);
router.delete("/thematiques/:id", authMiddleware, isAdmin, deleteThematique);

router.get("/notifications", authMiddleware, isModeratorOrAdmin, getNotificationsSentByModerator);
router.post("/notifications", authMiddleware, isModeratorOrAdmin, sendNotification);

router.get("/publicites", authMiddleware, getAllPublicites);
router.post("/publicites", authMiddleware, isAdmin, uploadPub.single("image"), createPublicite);
router.get("/publicites/:id", authMiddleware, getPubliciteById);
router.put("/publicites/:id", authMiddleware, isAdmin, uploadPub.single("image"), updatePublicite);
router.delete("/publicites/:id", authMiddleware, isAdmin, deletePublicite);

export default router;
