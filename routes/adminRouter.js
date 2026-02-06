import express from "express";

const router = express.Router();

import { loginAdmin, adminPage ,showBillsPage } from '../controller/adminController.js';

// Admin Routes
router.get('/login', loginAdmin);

router.get(`/dashboard/:password`, adminPage);

router.get(`/bills/:password`, showBillsPage);


export default router;
