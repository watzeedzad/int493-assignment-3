const mongoose = require("mongoose");
import { MongooseAutoIncrementID } from "mongoose-auto-increment-reworked";

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: Number,
  username: String,
  password: String,
  salt: String,
  email: String,
  firstname: String,
  lastname: String,
  tel: String,
  userPicturePath: String
});

MongooseAutoIncrementID.initialise("userId");

const options = {
  field: "userId",
  incrementBy: 1,
  nextCount: false,
  resetCount: "reset",
  startAt: 1000000,
  unique: true
};

const plugin = new MongooseAutoIncrementID(userSchema, "user", options);

// userSchema.plugin(autoIncrement, {
//   inc_field: 'userId'
// })

plugin.applyPlugin();

module.exports = mongoose.model("user", userSchema);
