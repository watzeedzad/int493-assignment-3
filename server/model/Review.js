const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = new Schema({
  reviewId: Number,
  userId: Number,
  restaurantId: Number,
  reviewPicturePath: [],
  reviewDate: Date
});

module.exports = mongoose.model("review", reviewSchema);
