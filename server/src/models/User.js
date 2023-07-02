const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profile_url: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
});

module.exports = mongoose.model("users", UserSchema);
