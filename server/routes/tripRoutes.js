const express = require("express");
const tripController = require("./../controllers/tripController");
const reviewRouter = require("../routes/reviewRoutes");
const authController = require("../controllers/authController");

const router = express.Router();

router.use("/:tripId/reviews", reviewRouter);

router
  .route("/")
  .get(tripController.getAllTrips)
  .post(tripController.createTrip);

router.route("/deleteTrip/:tripId").delete(tripController.deleteTrip);
router.get("/getTrip/:tripId", tripController.getTrip);
module.exports = router;
