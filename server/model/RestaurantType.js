const mongoose = require("mongoose");
import { MongooseAutoIncrementID } from "mongoose-auto-increment-reworked";

const { Schema } = mongoose;

const restaurantTypeSchema = new Schema({
  restaurantTypeId: Number,
  restaurantTypeDesc: String
});

MongooseAutoIncrementID.initialise("restaurantTypeId");

const options = {
  field: "restaurantId",
  incrementBy: 1,
  nextCount: false,
  resetCount: "reset",
  startAt: 10000,
  unique: true
};

const plugin = new MongooseAutoIncrementID(
  restaurantTypeSchema,
  "restaurantType",
  options
);

plugin.applyPlugin();

module.exports = mongoose.model("restaurantType", restaurantTypeSchema);
