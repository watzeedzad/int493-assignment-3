let express = require("express");
let router = express.Router();
let restaurant = require("../model/Restaurant");
let restaurantType = require("../model/RestaurantType");

router.get("/getAllRestaurant", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.get("/getAllRestaurant", (req, res) => {
  getAllRestaurant((status, restaurantResult) => {
    if (status) {
      res.status(200).send({
        error: false,
        restaurantResult: restaurantResult
      });
      return;
    } else {
      res.status(500).send({
        error: true,
        message: "error occur while getting all restaurant data from database"
      });
      return;
    }
  });
});

router.get("/getAllRestaurantType", (req, res, next) => {
  res.setHeader("Content-type", "application/json");
  next();
});

router.get("/getAllRestaurantType", (req, res) => {
  getAllRestaurantType((status, restaurantTypeResult) => {
    if (status) {
      res.status(200).send({
        error: false,
        restaurantTypeResult: restaurantTypeResult
      });
      return;
    } else {
      res.status(500).send({
        error: true,
        message: "error occur while getting data from database"
      });
      return;
    }
  });
});

async function getAllRestaurant(callback) {
  await restaurant.find({}, (err, result) => {
    if (err) {
      console.log(err);
      callback(false, []);
    } else if (!result) {
      callback(true, []);
    } else {
      callback(true, result);
    }
  });
}

async function getAllRestaurantType(callback) {
  await restaurantType.find({}, (err, result) => {
    if (err) {
      console.log(err);
      callback(false, []);
    } else if (!result) {
      callback(true, []);
    } else {
      callback(true, result);
    }
  });
}

module.exports = router;
