const mongoose = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  restaurantName: String,
  restaurantRating: Number,
  restaurantTypeId: Number,
  restaurantOpenTime: String,
  restaurantCloseTime: String,
  restaurantOpenDate: String,
  restaurantPicturePath: String,
  restaurantDesc: String,
  restaurantAddress: String,
  restaurantLat: Number,
  restaurantLong: Number
});

userSchema.plugin(autoIncrement, {
  inc_field: 'restaurantId'
})

module.exports = mongoose.model("Restaurant", restaurantSchema);
