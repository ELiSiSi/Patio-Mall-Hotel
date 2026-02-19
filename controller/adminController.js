import AppError from '../utils/appError.js';
import Room from '../models/roomModel.js';
import Booking from '../models/bookingModel.js';

// adminPage -----------------------------------------------------------------------------------
export const adminPage = async (req, res, next) => {
  try {
    const { password } = req.params;

    if (password === process.env.ADMIN_PASSWORD) {
      const totalRevenue = orders.reduce(
        (sum, order) => sum + (order.totalPrice || 0),
        0
      );

      res.render('admin/dashboard', {
        title: ' Dashboard',
      });
    } else {
      return res.status(403).send('Access denied: wrong password');
    }
  } catch (err) {
    console.error('Error in adminPage:', err);
    return next(new AppError('خطأ في تحميل لوحة التحكم', 500));
  }
};


// Booking page -----------------------------------------------------------------------------------
export const bookingPage = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.render('admin/booking', { title: 'Bookings', bookings });
  } catch (err) {
    console.error('Error in bookingPage:', err);
    return next(new AppError('خطاء في تحميل صفحة الحجوزات', 500));
  }
};

// Rooms page -----------------------------------------------------------------------------------
export const roomsPage = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.render('admin/rooms', { title: 'Rooms', rooms });
  } catch (err) {
    console.error('Error in roomsPage:', err);
    return next(new AppError('خطاء في تحميل صفحة الغرف', 500));
  }
};
