import express from "express";
const router = express.Router();

import { createBooking , getAllBookings , getBooking , deleteBooking , deleteAllBookings , updateBooking} from '../controller/bookingController.js';

router
  .route("/")
  .post(createBooking)
  .get(getAllBookings);


router.route('/:id').get(getBooking).delete(deleteBooking).patch(updateBooking);

router.route('/deleteAll').delete(deleteAllBookings);

export default router;
