import express from "express";
import { authMiddleware,isAdmin, isModeratorOrAdmin } from "../middleware/auth.js";
import { getAllUsers, updateUserRole, deleteUser, getStats, getThematiques } from "../controllers/adminController.js";
import { getReportedProducts, validateProduct, deleteProduct, getProducts } from "../controllers/moderationController.js";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { getNotificationsSentByModerator, sendNotification} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

router.get("/reported-products", getReportedProducts);
router.put("/products/:id/validate", validateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/products", getProducts);

router.get("/stats", getStats);

router.get("/categories", getCategories);
router.post("/categories", addCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

router.get("/thematiques", getThematiques);

router.get("/notifications", getNotificationsSentByModerator);
router.post("/notifications", sendNotification);
export default router;
