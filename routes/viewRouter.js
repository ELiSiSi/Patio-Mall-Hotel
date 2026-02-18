import express from "express";
const router = express.Router();

import { homepage, hotelPage, restaurantPage, cafePage, doctorsPage, kidsPage, labPage, lessonsPage, bookingPage } from '../controller/viewController.js';

// View Routes
router.get('/', homepage);

router.get('/hotel', hotelPage);
router.get('/restaurant', restaurantPage);
router.get('/cafe', cafePage);
router.get('/doctors', doctorsPage);
router.get('/kids', kidsPage);
router.get('/lab', labPage);
router.get('/lessons', lessonsPage);
router.get('/booking', bookingPage);

export default router;
