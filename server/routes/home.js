let express = require("express");
let router = express.Router();
let restaurant = require("../model/Restaurant");
let restaurantType = require("../model/RestaurantType");

router.get("/getAllRestaurant", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.get("/getAllRestaurant", (req, res) => {
  getAllRestaurant((errorStatus, restaurantResult) => {
    if (errorStatus) {
      res.status(500).send({
        error: true,
        message: "error occur while getting all restaurant data from database"
      });
      return;
    } else {
      res.status(200).send({
        error: false,
        restaurantResult: restaurantResult
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
  getAllRestaurantType((errorStatus, restaurantTypeResult) => {
    if (errorStatus) {
      res.status(500).send({
        error: true,
        message: "error occur while getting data from database"
      });
      return;
    } else {
      res.status(200).send({
        error: false,
        restaurantTypeResult: restaurantTypeResult
      });
      return;
    }
  });
});

async function getAllRestaurant(callback) {
  try {
    await restaurant.aggregate(
      [
        {
          $lookup: {
            from: "restauranttypes",
            localField: "restaurantTypeId",
            foreignField: "restaurantTypeId",
            as: "restaurantDescObj"
          }
        },
        {
          $unwind: "$restaurantDescObj"
        },
        {
          $project: {
            restaurantId: 1,
            restaurantName: 1,
            restaurantRating: 1,
            restaurantTypeDesc: "$restaurantDescObj.restaurantTypeDesc",
            restaurantOpenTime: 1,
            restaurantCloseTime: 1,
            restaurantOpenDate: 1,
            restaurantPicturePath: 1,
            restaurantDesc: 1,
            restaurantAddress: 1,
            restaurantLat: 1,
            restaurantLong: 1,
            restaurantTel: 1,
            restaurantTypeId: 1
          }
        }
      ],
      (err, result) => {
        if (err) {
          callback(true, []);
        } else if (!result) {
          callback(true, []);
        } else {
          callback(false, result);
        }
      }
    );
  } catch (error) {
    console.log(error);
    callback(true, []);
  }
}

async function getAllRestaurantType(callback) {
  try {
    await restaurantType.find({}, (err, result) => {
      if (err) {
        console.log(err);
        callback(true, []);
      } else if (!result) {
        callback(true, []);
      } else {
        callback(false, result);
      }
    });
  } catch (error) {
    console.log(error);
    callback(true, []);
  }
}

module.exports = router;
