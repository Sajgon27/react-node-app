const Trip = require("./../models/tripModel");

exports.getAllTrips = async (req, res, next) => {
  const trips = await Trip.find();
  res.status(200).json({
    status: "success",
    data: {
      trips,
    },
  });
};

exports.createTrip = async (req, res, next) => {
  console.log(req.body);

  const trip = await Trip.create(req.body);

  res.status(201).json({
    status: "succes",
    data: {
      data: trip,
    },
  });
};

exports.deleteTrip = async (req, res, next) => {
  const trip = await Trip.findByIdAndDelete(req.params.tripId);
  res.status(204).json({
    status: "succes",
    data: null,
  });
};

exports.getTrip = async (req, res, next) => {
  const trip = await Trip.findById(req.params.tripId);
  if (!trip) {
    console.log("not good");
  }
  res.status(200).json({
    status: "success",
    data: {
      data: trip,
    },
  });
};
