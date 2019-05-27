const mongoose = require("mongoose");
import { MongooseAutoIncrementID } from "mongoose-auto-increment-reworked";

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
  restaurantLong: Number,
  restaurantTel: String
});

MongooseAutoIncrementID.initialise("restaurantId");

const options = {
  field: "restaurantId",
  incrementBy: 1,
  nextCount: false,
  resetCount: "reset",
  startAt: 1000001,
  unique: true
};

const plugin = new MongooseAutoIncrementID(
  restaurantSchema,
  "restaurant",
  options
);

// restaurantSchema.plugin(
//   MongooseAutoIncrementID.plugin,
//   {
//     modelName: "restaurant"
//   },
//   options
// );

plugin.applyPlugin();

module.exports = mongoose.model("restaurant", restaurantSchema);
