import compression from 'compression';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import dotenv from 'dotenv';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import mongoose from 'mongoose';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import xss from 'xss-clean';
dotenv.config();

import adminRouter from './routes/adminRouter.js';
import viewRouter from './routes/viewRouter.js';
import AppError from './utils/appError.js';
import bookingRouter from './routes/bookingRouter.js';
import roomRouter from './routes/roomRouter.js';

const MONGO_URI = process.env.MONGO_URI;
const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ===== Mongoose Connection (مرة واحدة بس) =====
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB Error:', err);
    throw err;
  }
};
connectDB();

// ===== Middleware =====
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '10kb' })); // ✅ مرة واحدة بس
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(compression());

// استبدل الـ limiter الحالي بده

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later.',
  // ✅ مطلوب على Vercel لأنه بيشتغل ورا proxy
  keyGenerator: (req) => {
    return (
      req.headers['x-forwarded-for']?.split(',')[0].trim() ||
      req.headers['x-real-ip'] ||
      req.socket.remoteAddress ||
      'unknown'
    );
  },
  validate: { xForwardedForHeader: false }, // ✅ يوقف الـ warning
});
app.use('/api', limiter);

// Locals
app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
  res.locals.stripePublicKey = process.env.STRIPE_PUBLISHABLE_KEY;
  req.requestTime = new Date().toISOString();
  next();
});

// ✅ لازم يكون كده
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // ← السطر ده ناقص
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    etag: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  })
);

// ===== Routes =====
app.get('/.well-known/*', (req, res) => res.status(204).end());

app.use('/', viewRouter);
app.use('/admin', adminRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/room', roomRouter);

// ===== 404 =====
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
});

// ===== Start Server (محلياً بس - Vercel بيتجاهله) =====
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`🚀 App listening at http://localhost:${port}`);
  });
}

process.on('unhandledRejection', (err) => {
  console.log('❌ Unhandled Rejection:', err.name, err.message);
});

process.on('uncaughtException', (err) => {
  console.log('❌ Uncaught Exception:', err.name, err.message);
});

export default app;
