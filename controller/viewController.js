import AppError from '../utils/appError.js';

import  Room from '../models/roomModel.js';

// homepage -----------------------------------------------------------------------------------
export const homepage = async (req, res, next) => {
  try {
    res.status(200).render('home', {
      title: 'Home',
    });
  } catch (err) {
    return next(new AppError('No document found with that ID', 404));
  }
};

// hotelPage -----------------------------------------------------------------------------------
export const hotelPage = async (req, res, next) => {
  try {
    res.status(200).render('hotel', { title: 'hotel' });
  } catch (err) {
    next(err);
  }
};

// doctorsPage -----------------------------------------------------------------------------------
export const doctorsPage = async (req, res, next) => {
  try {
    res.status(200).render('doctors', { title: 'doctors' });
  } catch (err) {
    next(err);
  }
};

// restaurantPage -----------------------------------------------------------------------------------
export const restaurantPage = async (req, res, next) => {
  try {
    res.status(200).render('restaurant', { title: 'restaurant' });
  } catch (err) {
    next(err);
  }
};

// cafePage -----------------------------------------------------------------------------------
export const cafePage = async (req, res, next) => {
  try {
    res.status(200).render('cafe', { title: 'cafe' });
  } catch (err) {
    next(err);
  }
};

// kidsPage -----------------------------------------------------------------------------------
export const kidsPage = async (req, res, next) => {
  try {
    res.status(200).render('kids', { title: 'kids' });
  } catch (err) {
    next(err);
  }
};

// labPage -----------------------------------------------------------------------------------
export const labPage = async (req, res, next) => {
  try {
    res.status(200).render('lab', { title: 'lab' });
  } catch (err) {
    next(err);
  }
};

// centerPage -----------------------------------------------------------------------------------
export const centerPage = async (req, res, next) => {
  try {
    res.status(200).render('center', { title: 'center' });
  } catch (err) {
    next(err);
  }
};

// lessonsPage -----------------------------------------------------------------------------------
export const lessonsPage = async (req, res, next) => {
  try {
    res.status(200).render('lessons', { title: 'Lessons' });
  } catch (err) {
    next(err);
  }
};

// bookingPage -----------------------------------------------------------------------------------
export const bookingPage = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).render('booking', { title: 'booking' , rooms });
  } catch (err) {
    next(err);
  }
};
