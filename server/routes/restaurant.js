let express = require("express");
let router = express.Router();
let restaurant = require("../model/Restaurant");

router.get("/getRestaurantDetail", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.get("/getRestaurantDetail", (req, res) => {
  let restaurantId = req.query.restaurantId;

  if (typeof restaurantId === "undefined") {
    res.status(500).send({
      error: true,
      message: "restaurant id can not be empty"
    });
    return;
  }

  getRestaurantDetail(restaurantId, (status, restaurantDetailResult) => {
    if (status) {
      res.status(200).send({
        error: false,
        restaurantDetailResult: restaurantDetailResult
      });
      return;
    } else {
      res.status(500).send({
        error: true,
        message: "error occur while getting restaurant detail from database"
      });
      return;
    }
  });
});

async function getRestaurantDetail(restaurantId, callback) {
  await restaurant.findOne(
    {
      restaurantId: restaurantId
    },
    (err, result) => {
      if (err) {
        console.log(err);
        callback(false, null);
      } else if (!result) {
        callback(true, null);
      } else {
        callback(true, result);
      }
    }
  );
}

module.exports = router;
