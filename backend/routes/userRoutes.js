import express from "express";
import { getMe, updateMe } from "../controllers/UserController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);           // user connecté
router.put("/me", authMiddleware, updateMe);        // user connecté peut modifier
router.get("/admin", authMiddleware, isAdmin, (req, res) => res.send("Page admin"));

export default router;
