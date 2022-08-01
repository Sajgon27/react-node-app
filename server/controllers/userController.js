const User = require("../models/userModel");

exports.getUser = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findById({ _id });
  console.log(user);
  res.status(200).json({
    status: "succes",
    user,
  });
};
