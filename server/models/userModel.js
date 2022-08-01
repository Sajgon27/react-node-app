const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter a name"],
  },

  email: {
    type: String,
    required: [true, "Enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Enter a valid email"],
  },
  photo: {
    type: String,
    default:
      "https://www.seekpng.com/png/full/28-284365_this-icon-is-depicting-a-face-with-a.png",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide a valid password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords must be the same",
    },
  },
});

userSchema.methods.samePassword = async function (p1, p2) {
  return await bcrypt.compare(p1, p2);
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
