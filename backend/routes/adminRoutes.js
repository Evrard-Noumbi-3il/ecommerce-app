import express from "express";
import { authMiddleware,isAdmin, isModeratorOrAdmin } from "../middleware/auth.js";
import upload from "../middleware/uploadThematique.js";
import { getAllUsers, updateUserRole, deleteUser, getStats } from "../controllers/adminController.js";
import { getReportedProducts, validateProduct, deleteProduct, getProducts } from "../controllers/moderationController.js";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { getNotificationsSentByModerator, sendNotification} from "../controllers/notificationController.js";
import { addThematique,
  getThematiques,
  getThematiqueById,
  updateThematique,
  deleteThematique, } from "../controllers/thematiqueController.js";

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

router.post("/thematiques", upload.single("image"), addThematique);
router.get("/thematiques", getThematiques);
router.get("/thematiques/:id", getThematiqueById);
router.put("/thematiques/:id", upload.single("image"), updateThematique);
router.delete("/thematiques/:id", deleteThematique);

router.get("/notifications", getNotificationsSentByModerator);
router.post("/notifications", sendNotification);
export default router;
