import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Please provide an image'],
  },
});

const Gallry = mongoose.model('Gallry', gallerySchema);
export default Gallry;
