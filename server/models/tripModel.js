const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A trip must have name"],
    unique: true,
    trim: true,
    maxlength: [40, "Maximaly 40 characters"],
    minlength: [5, "At least 5 characters"],
  },
  duration: {
    type: Number,
    required: [true, "Trip must have a duration"],
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Trip must have a price"],
  },
  priceDiscount: Number,
  description: {
    type: String,
    trim: true,
    require: [true, "Trip must have a description"],
  },
  imageCover: {
    type: String,
    require: [true, "Trip must have an image cover"],
  },
  location: {
    type: String,
    require: [true, "Trip must have a location"],
  },
  startDates: [Date],
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
