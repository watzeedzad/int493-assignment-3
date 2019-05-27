const mongoose = require("mongoose");
import { MongooseAutoIncrementID } from "mongoose-auto-increment-reworked";

const { Schema } = mongoose;

const restaurantTypeSchema = new Schema({
  restaurantTypeId: Number,
  restaurantTypeDesc: String
});

MongooseAutoIncrementID.initialise("restaurantTypeId");

const options = {
  field: "restaurantTypeId",
  incrementBy: 1,
  nextCount: false,
  resetCount: "reset",
  startAt: 100001,
  unique: true
};

const plugin = new MongooseAutoIncrementID(
  restaurantTypeSchema,
  "restaurantType",
  options
);

plugin.applyPlugin();

module.exports = mongoose.model("restaurantType", restaurantTypeSchema);
