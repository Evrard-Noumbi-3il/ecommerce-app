import express from "express";
import { getMe, updateMe } from "../controllers/userController.js";

const router = express.Router();

router.get("/me/:id", getMe);           // user connecté
router.put("/me", updateMe);        // user connecté peut modifier

export default router;
