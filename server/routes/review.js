let express = require("express");
let router = express.Router();
let review = require("../model/Review");
let user = require("../model/User");
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
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      let fileMimeType = file.mimetype.split("/");
      let fileExtension = fileMimeType[1];
      cb(null, "photos/" + Date.now().toString() + "." + fileExtension);
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

router.post("/addReview", uploadToS3.array("reviewPicture"), (req, res) => {
  let userId = req.user.user;
  console.log();
  let reviewPicturePath;
  let { restaurantId, reviewRate, reviewDesc, reviveDate } = req.body;
  // if (typeof ) {

  // }
  res.status(200).send(req.files);
});

async function addReview() {}

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
