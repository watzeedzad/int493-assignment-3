const mongoose = require("mongoose");
import { MongooseAutoIncrementID } from "mongoose-auto-increment-reworked";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  reviewId: Number,
  userId: Number,
  restaurantId: Number,
  reviewRate: Number,
  reviewDesc: String,
  reviewPicturePath: [],
  reviewDate: Date
});

MongooseAutoIncrementID.initialise("reviewId");

const options = {
  field: "reviewId",
  incrementBy: 1,
  nextCount: false,
  resetCount: "reset",
  startAt: 1000000000,
  unique: true
};

const plugin = new MongooseAutoIncrementID(reviewSchema, "review", options);

// reviewSchema.plugin(
//   MongooseAutoIncrementID.plugin,
//   {
//     modelName: "review"
//   },
//   options
// );

plugin.applyPlugin();

module.exports = mongoose.model("review", reviewSchema);
