import express from "express";
<<<<<<< HEAD
import { getMe, updateMe, addMiseEnVente } from "../controllers/userController.js";

const router = express.Router();

router.get("/me/:id", getMe);           // user connecté
router.put("/me", updateMe);        // user connecté peut modifier
router.post("/addMiseEnVente", addMiseEnVente);
=======
import { updateMe, getMe } from "../controllers/UserController.js";

const router = express.Router();

// Middleware JSON global ou sur cette route
router.use(express.json());

// Exemple de route update
router.put("/me", updateMe);
router.get("/me/:id", getMe);

>>>>>>> 0f45ce1c9998699205b46a0f3b3ceef7ff93264b
export default router;
