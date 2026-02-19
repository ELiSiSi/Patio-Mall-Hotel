import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    // ===== معلومات الاتصال =====
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      trim: true,
      match: [/^(01)[0-9]{9}$/, 'Please provide a valid Egyptian phone number'],
    },

    // ===== نوع الحجز =====
    bookingType: {
      type: String,
      required: [true, 'Please provide the booking type'],
      enum: {
        values: ['room', 'event', 'cottage'],
        message: 'Booking type must be room, event, or cottage',
      },
    },

    // ===== التواريخ =====
    checkIn: {
      type: Date,
      required: [true, 'Please provide the check-in date'],
    },
    checkOut: {
      type: Date,
      // ليست required لأن المناسبة checkOut = checkIn (نفس اليوم)
      // والكوخ بيتحسب من عدد الأيام في الـ frontend
      default: null,
    },

    // ===== عدد الأشخاص =====
    numbers: {
      type: Number,
      required: [true, 'Please provide the number of people'],
      min: [1, 'Number of people must be at least 1'],
    },

    // ===== عدد الغرف (للغرف الفندقية فقط) =====
    rooms: {
      type: Number,
      default: 1,
      min: [1, 'Number of rooms must be at least 1'],
    },

    // ===== ملاحظات / رسالة =====
    message: {
      type: String,
      default: 'لا توجد ملاحظات إضافية',
      trim: true,
    },

    // ===== تفاصيل الغرفة الفندقية =====
    roomType: {
      type: String,
      default: null,
    },

    // ===== تفاصيل المناسبة =====
    eventType: {
      type: String,
      enum: {
        values: [
          'wedding',
          'engagement',
          'birthday',
          'anniversary',
          'corporate',
          'photo',
          'other',
          null,
        ],
        message: 'Invalid event type',
      },
      default: null,
    },
    eventDuration: {
      type: String, // "1", "2", ... "full"
      default: null,
    },
    eventTime: {
      type: String, // "4 عصراً"
      default: null,
    },
    // خدمات المناسبة الإضافية
    catering: { type: Boolean, default: false },
    decoration: { type: Boolean, default: false },
    photography: { type: Boolean, default: false },

    // ===== إضافات الكوخ الرومانسية =====
    flowers: { type: Boolean, default: false },
    candles: { type: Boolean, default: false },
    breakfast: { type: Boolean, default: false },
    surprise: { type: Boolean, default: false },

    // ===== الحالة =====
    status: {
      type: String,
      enum: {
        values: ['pending', 'confirmed', 'cancelled'],
        message: 'Status must be pending, confirmed, or cancelled',
      },
      default: 'pending',
    },
  },
  {
    timestamps: true, // createdAt و updatedAt أوتوماتيك
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ===== Virtual: عدد الليالي =====
bookingSchema.virtual('nights').get(function () {
  if (!this.checkIn || !this.checkOut) return null;
  const diff = new Date(this.checkOut) - new Date(this.checkIn);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// ===== Middleware: التحقق قبل الحفظ =====
bookingSchema.pre('save', function (next) {
  // للغرف الفندقية: checkOut مطلوب
  if (this.bookingType === 'room' && !this.checkOut) {
    return next(new Error('Check-out date is required for room bookings'));
  }
  // checkOut لازم يكون بعد checkIn أو نفس اليوم (للمناسبات)
  if (this.checkOut && this.checkIn && this.checkOut < this.checkIn) {
    return next(new Error('Check-out date must be after check-in date'));
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
