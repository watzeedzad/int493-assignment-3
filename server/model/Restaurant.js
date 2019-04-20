const mongoose = require("mongoose");

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  restaurantId: Number,
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

module.exports = mongoose.model("Restaurant", restaurantSchema);
