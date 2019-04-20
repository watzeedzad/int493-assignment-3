const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: Number,
  username: String,
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  tel: String,
  userPicturePath: String
});

module.exports = mongoose.model("User", userSchema);
