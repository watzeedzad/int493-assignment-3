let express = require("express");
let router = express.Router();
let review = require("../model/Review");

router.get("/", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.get("/", (req, res) => {
  let restaurantId = req.query.restaurantId;

  getRestaurantReviews(restaurantId, (errorStatus, restaurantReviewResult) => {});
});

async function getRestaurantReviews(restaurantId, callback) {
  try {
    await review({
      restaurantId: restaurantId
    }, (err, result) => {
      if (err) {
        console.log(err);
        callback
      }
    })
  } catch (error) {
    console.log(error);
    console.log(true, []);
  }
}

module.exports = router;
