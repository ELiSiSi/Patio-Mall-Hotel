import Booking from '../models/bookingModel.js';
import {
  createOne,
  deleteAll,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './hendlerFactory.js';

// create booking-----------------------------------------------------------------------------------
export const createBooking = createOne(Booking);
// get all bookings-----------------------------------------------------------------------------------
export const getAllBookings = getAll(Booking);
// get booking by id-----------------------------------------------------------------------------------
export const getBooking = getOne(Booking);
// update booking-----------------------------------------------------------------------------------
export const updateBooking = updateOne(Booking);
// delete booking-----------------------------------------------------------------------------------
export const deleteBooking = deleteOne(Booking);
// delete all bookings-----------------------------------------------------------------------------------
export const deleteAllBookings = deleteAll(Booking);
