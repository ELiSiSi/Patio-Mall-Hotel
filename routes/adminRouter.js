import express from "express";

const router = express.Router();

import {   adminPage , bookingPage ,roomsPage , gallryPage} from '../controller/adminController.js';

// Admin Routes


router.get(`/dashboard/:password`, adminPage);

router.get('/booking/:password', bookingPage);

router.get('/rooms/:password', roomsPage);

router.get('/gallry/:password', gallryPage);


export default router;
