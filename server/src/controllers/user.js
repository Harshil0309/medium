const users = require("../db/user");
const { validationResult } = require("express-validator");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const doesUserExist = false;
  const isPasswordSame = false;
  for (let i = 0; i < users.length; ++i) {
    if (users[i].email == email) {
      doesUserExist = true;
      if (users[i].password == password) {
        isPasswordSame = true;
      }
      break;
    }
  }
  if (doesUserExist == false) {
    return res.status(400).json({ message: "User doesn't exist" });
  }
  if (isPasswordSame == false) {
    return res.status(401).json({ message: "Incorrect Password" });
  }
  // cookie
  // user_id
  return res.status(200).json({ message: "User logged in successfull" });
};

const signup = async (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors.length != 0) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  const doesUserExist = false;
  for (let i = 0; i < users.length; ++i) {
    if (users[i].email == email) {
      doesUserExist = true;
      break;
    }
  }

  if (doesUserExist == true) {
    return res.status(400).json({ message: "User already exists." });
  }

  // password hashing
  const newUser = {
    name,
    password,
    email,
    profile_url,
  };

  users.push(newUser);

  res.status(200).json({ message: "User created successfully." });
};

const edit = async (req, res, next) => {};

module.exports = {
  login,
  signup,
  edit,
};
