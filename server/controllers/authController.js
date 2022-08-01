const User = require("../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.cookie("jwt", token);
    res.status(201).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch {
    console.log("error");
    res.status(400).json({
      status: "error",
      data: null,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // console.log(req.headers.authorization);
      // token = req.headers.authorization.split(" ")[1];
      // console.log(token);
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
      console.log(token);
    }

    if (!token) {
      console.log("ni ma");
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      console.log("there is no such user");
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.samePassword(password, user.password)) {
      console.log("eror pass or user");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("jwt", token);
    console.log("logeged in");
    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch {
    console.log("nottt log in");
    res.status(404).json({
      status: "error",

      data: null,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout");
  res.status(200).json({ status: "success" });
};
