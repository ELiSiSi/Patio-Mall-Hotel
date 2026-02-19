import express from "express";
const router = express.Router();

import { homepage,  restaurantPage, cafePage, doctorsPage, kidsPage, labPage, lessonsPage, bookingPage ,centerPage } from '../controller/viewController.js';

// View Routes
router.get('/', homepage);

router.get('/restaurant', restaurantPage);
router.get('/cafe', cafePage);
router.get('/doctors', doctorsPage);
router.get('/kids', kidsPage);
router.get('/lab', labPage);
router.get('/lessons', lessonsPage);
router.get('/booking', bookingPage);
router.get('/center', centerPage);

export default router;
