
import AppError from '../utils/appError.js';




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




