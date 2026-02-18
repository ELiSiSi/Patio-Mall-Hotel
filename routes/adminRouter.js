import express from "express";

const router = express.Router();

import {   adminPage   } from '../controller/adminController.js';

// Admin Routes


router.get(`/dashboard/:password`, adminPage);




export default router;
