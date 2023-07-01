const express = require("express");
const userController = require("../controllers/user");
const { body } = require("express-validator");

const router = express.Router();

router.post("/login", userController.login);
router.post(
  "/signup",
  body("name").notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  body("profile_url").notEmpty().isString(),
  body("password").isString().isLength({ min: 5, max: 15 }),
  userController.signup
);

module.exports = router;
