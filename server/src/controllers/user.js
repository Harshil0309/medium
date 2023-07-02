
// 1) COOKIES


const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const login = async (req, res, next) => {
  const { email, password: givenPassword } = req.body;
  try {
    let user = await User.findOne({ email }).select("name email password");
    if (!user) {
      return res.json({ message: "User not registered" });
    }
    const { password: dbPassword } = user;
    const isPasswordMatch = await bcrypt.compare(givenPassword, dbPassword);
    if (!isPasswordMatch) {
      return res.json({ message: "Password Error." });
    }
    user.password = null;
    return res.status(201).json({
      message: "User logged in successfully",
      data: user,
    });
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

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    // console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);

    const myUser = new User({
      email,
      password: hashedPassword,
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


