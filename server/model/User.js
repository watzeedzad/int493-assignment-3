const mongoose = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  salt: String,
  email: String,
  firstname: String,
  lastname: String,
  tel: String,
  userPicturePath: String
});

userSchema.plugin(autoIncrement, {
  inc_field: 'userId'
})

module.exports = mongoose.model("user", userSchema);
