const { validationResult } = require("express-validator");

const User = require("../models/User");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password }).select("name email");
    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }

    // cookie

    return res
      .status(201)
      .json({ message: "User logged in successfully", data: user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const signup = async (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length != 0) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }
  const { name, password, email, profile_url } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });

    if (user) {
      return res.json({ message: "User already exist" });
    }

    // password hashing

    const myUser = new User({
      email,
      password,
      name,
      profile_url,
    });

    const savedUserData = await myUser.save();

    return res.json({
      message: "User saved successfully",
      data: savedUserData,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  login,
  signup,
};
