let express = require("express");
let router = express.Router();
let review = require("../model/Review");
let user = require("../model/User");
let restaurant = require("../model/Restaurant");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
let multer = require("multer");
let multer_s3 = require("multer-s3");
let aws = require("aws-sdk");
require("dotenv").config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(
    "authorization".toLowerCase()
  ),
  secretOrKey: process.env.JWT_SECRET
};
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  login(payload.username, result => {
    if (result == null) {
      done(null, false);
    } else {
      done(null, result);
    }
  });
});

async function login(username, callback) {
  try {
    await user.findOne(
      {
        username: username
      },
      (err, result) => {
        if (err) {
          console.log(err);
          callback(null);
        } else if (!result) {
          //   console.log(result);
          callback(null);
        } else {
          callback(result);
        }
      }
    );
  } catch (error) {
    console.log(error);
    callback(null);
  }
}

passport.use(jwtAuth);

const requireJWTAuth = passport.authenticate("jwt", { session: false });

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.S3_REGION
});

const uploadToS3 = multer({
  storage: multer_s3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      let fileMimeType = file.mimetype.split("/");
      let fileExtension = fileMimeType[1];
      cb(null, "photos/reviews/" + Date.now().toString() + "." + fileExtension);
    }
  })
});

router.get("/getRestaurantReviews", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.get("/getRestaurantReviews", (req, res) => {
  let restaurantId = parseInt(req.query.restaurantId);

  if (typeof restaurantId === "undefined") {
    res.status(500).send({
      error: true,
      message: "can not get data from all required parameter"
    });
    return;
  }

  getRestaurantReviews(restaurantId, (errorStatus, restaurantReviewResult) => {
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
  });
});

router.post("/addReview", requireJWTAuth, (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.post(
  "/addReview",
  uploadToS3.array("reviewPicture"),
  async (req, res) => {
    let userId = req.user.sub;
    let reviewPicturePath = [];
    let { restaurantId, reviewRate, reviewDesc } = req.body;

    if (
      typeof restaurantId === "undefined" ||
      typeof reviewRate === "undefined" ||
      typeof reviewDesc === "undefined"
    ) {
      res.status(500).send({
        error: true,
        message: "can not get data from all required parameter"
      });
      return;
    }

    restaurantId = parseInt(restaurantId);

    if (typeof req.files !== "undefined") {
      req.files.forEach(value => {
        reviewPicturePath.push(value.location);
      });
    }

    await addReview(
      userId,
      restaurantId,
      reviewRate,
      reviewDesc,
      reviewPicturePath,
      async (errorStatus, addReviewResultData) => {
        if (errorStatus) {
          res.status(200).send({
            error: true,
            message: "error occur while adding new review 1"
          });
          return;
        } else {
          await getAvgRestaurantRating(
            restaurantId,
            async (
              getAvgRestaurantRatingStatus,
              getAvgRestaurantRatingData
            ) => {
              if (getAvgRestaurantRatingStatus) {
                res.status(200).send({
                  error: true,
                  message: "error occur while adding new review 2"
                });
                return;
              } else {
                await updateRestaurantRating(
                  getAvgRestaurantRatingData[0],
                  updateRatingStatus => {
                    if (updateRatingStatus) {
                      res.status(200).send({
                        error: true,
                        message: "error occur while adding new review 3"
                      });
                      return;
                    } else {
                      res.status(200).send({
                        error: false,
                        review: addReviewResultData
                      });
                      return;
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
);

async function addReview(
  userId,
  restaurantId,
  reviewRate,
  reviewDesc,
  reviewPicturePath,
  callback
) {
  try {
    let newReviewData = new review({
      userId: userId,
      restaurantId: restaurantId,
      reviewRate: reviewRate,
      reviewDesc: reviewDesc,
      reviewDate: new Date(),
      reviewPicturePath: reviewPicturePath
    });
    await newReviewData.save((err, doc) => {
      if (err) {
        console.log(err);
        callback(true, null);
      } else if (!doc) {
        callback(true, null);
      } else {
        callback(false, doc);
      }
    });
  } catch (error) {
    console.log(error);
    callback(true, null);
  }
}

async function getRestaurantReviews(restaurantId, callback) {
  try {
    await review.aggregate(
      [
        {
          $match: {
            restaurantId: restaurantId
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "userId",
            as: "userInfo"
          }
        },
        {
          $project: {
            reviewId: 1,
            userId: 1,
            firstname: "$userInfo.firstname",
            lastname: "$userInfo.lastname",
            email: "$userInfo.email",
            userPicturePath: "$userInfo.userPicturePath",
            restaurantId: 1,
            reviewRate: 1,
            reviewDesc: 1,
            reviewPicturePath: 1,
            reviewDate: 1
          }
        }
      ],
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

async function getAvgRestaurantRating(restaurantId, callback) {
  try {
    await review.aggregate(
      [
        {
          $match: {
            restaurantId: restaurantId
          }
        },
        {
          $group: {
            _id: "$restaurantId",
            avgRating: {
              $avg: "$reviewRate"
            }
          }
        }
      ],
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

async function updateRestaurantRating({ _id, avgRating }, callback) {
  try {
    await restaurant.findOneAndUpdate(
      {
        restaurantId: _id
      },
      {
        $set: {
          restaurantRating: avgRating
        }
      },
      (err, doc) => {
        if (err) {
          callback(true);
        } else if (!doc) {
          callback(true);
        } else {
          callback(false);
        }
      }
    );
  } catch (error) {
    console.log(error);
    callback(false);
  }
}

module.exports = router;
