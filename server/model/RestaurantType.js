const mongoose = require("mongoose");

const { Schema } = mongoose;

const restaurantTypeSchema = new Schema({
  restaurantTypeId: Number,
  restaurantTypeDesc: Number
});

module.exports = mongoose.model("RestaurantType", restaurantTypeSchema);
