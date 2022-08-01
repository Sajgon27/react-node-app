const Review = require("../models/reviewModel");

exports.getAllReviews = async (req, res, next) => {
  console.log("f");
  const review = await Review.find({ trip: req.params.tripId }).populate({
    path: "user",
  });
  res.status(200).json({
    status: "success",
    review,
  });
};

exports.addReview = async (req, res, next) => {
  try {
    const review = await Review.create({
      trip: req.params.tripId,
      review: req.body.review,
      rating: req.body.rating,
      user: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        data: review,
      },
    });
  } catch {
    res.status(400).json({
      status: "error",
      data: null,
    });
  }
};
