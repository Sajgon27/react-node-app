const express = require("express");
const tripsRouter = require("./routes/tripRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.use("/api/v1/trips", tripsRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

module.exports = app;
