import express from 'express';

import { createAvis, getAvisByUser } from '../controllers/avisController.js';

const router = express.Router();
router.post('/create', createAvis);
router.get('/user/:id',getAvisByUser);

export default router;
