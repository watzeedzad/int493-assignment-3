let express = require("express");
let router = express.Router();
let review = require("../model/Review");

router.get("/", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.get("/", (req, res) => {
  let restaurantId = parseInt(req.query.restaurantId);

  if (typeof restaurantId === "undefined") {
    res.status(500).send({
      error: true,
      message: "can not get data from all required parameter"
    });
    return;
  }

  getRestaurantReviews(
    restaurantId,
    (errorStatus, restaurantReviewResult) => {
      if (errorStatus) {
        res.status(500).send({
          error: true,
          message: "error occur while getting data from database"
        });
        return;
      } else {
        res.status(200).send({
          error: false,
          restaurantReviews: restaurantReviewResult
        });
        return;
      }
    }
  );
});

async function getRestaurantReviews(restaurantId, callback) {
  try {
    await review.find(
      {
        restaurantId: restaurantId
      },
      (err, result) => {
        if (err) {
          console.log(err);
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
    console.log(true, []);
  }
}

module.exports = router;
