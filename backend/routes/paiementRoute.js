import express from "express";
import{processPayment,sessionStatus} from "../controllers/paiementController.js";

const router = express.Router();

router.post("/create-checkout-session", processPayment);
router.get("/session-status", sessionStatus);

export default router;