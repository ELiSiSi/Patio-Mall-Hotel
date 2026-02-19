import express from "express";

const router = express.Router();

import {   adminPage , bookingPage ,roomsPage } from '../controller/adminController.js';

// Admin Routes


router.get(`/dashboard/:password`, adminPage);

router.get('/booking/:password', bookingPage);

router.get('/rooms/:password', roomsPage);



export default router;
