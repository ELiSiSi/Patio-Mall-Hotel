import mongoose from 'mongoose';
import slugify from 'slugify';

const offerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Offer must have a name'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Offer must have a price'],
    },
    newprice: {
      type: Number,
    },
    image: {
      type: String,
      required: [true, 'Offer must have an image'],
    },
  },
  { timestamps: true }
);

offerSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

offerSchema.index({ name: 1 });
offerSchema.index({ slug: 1 });

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
