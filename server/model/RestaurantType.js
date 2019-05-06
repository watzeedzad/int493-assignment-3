const mongoose = require("mongoose");

const { Schema } = mongoose;

const restaurantTypeSchema = new Schema({
  restaurantTypeId: Number,
  restaurantTypeDesc: String
});

module.exports = mongoose.model("restaurantType", restaurantTypeSchema);
