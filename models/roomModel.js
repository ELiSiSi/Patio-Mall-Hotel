import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a room name'],
    unique: true,
    validate: {
      validator: async function (value) {
        const doc = await Room.findOne({ name: value });
        return !doc;
      },
      message: 'Room name already exists',
    },
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for the room'],
  },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
