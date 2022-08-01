const mongoose = require("mongoose");
const Trip = require("./tripModel");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review must have a name"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  trip: {
    type: mongoose.Schema.ObjectId,
    ref: "Trip",
    required: [true, "Review must have a trip"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Must be a user"],
  },
});

reviewSchema.statics.averageRating = async function (tripId) {
  const stats = await this.aggregate([
    {
      $match: {
        trip: tripId,
      },
    },
    {
      $group: {
        _id: "$trip",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Trip.findByIdAndUpdate(tripId, {
      ratingsAverage: stats[0].avgRating,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.averageRating(this.trip);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
