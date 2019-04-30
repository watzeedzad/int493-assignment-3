let express = require("express");
let router = express.Router();
let restaurant = require("../model/Restaurant");
let restaurantType = require("../model/RestaurantType");
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
      cb(null, "photos/" + Date.now().toString());
    }
  })
});

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

  getRestaurantDetail(restaurantId, (errorStatus, restaurantDetailResult) => {
    if (errorStatus) {
      res.status(500).send({
        error: true,
        message: "error occur while getting restaurant detail from database"
      });
      return;
    } else {
      res.status(200).send({
        error: false,
        restaurantDetailResult: restaurantDetailResult
      });
      return;
    }
  });
});

router.put("/addRestaurant", requireJWTAuth, (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  let {
    restaurantName,
    restaurantOpenTime,
    restaurantCloseTime,
    restaurantOpenDate,
    restaurantDesc,
    restaurantLat,
    restaurantLong,
    restaurantTypeId,
    restaurantAddress
  } = req.body;
  if (
    typeof restaurantName === "undefined" ||
    typeof restaurantOpenTime === "undefined" ||
    typeof restaurantCloseTime === "undefined" ||
    typeof restaurantOpenDate === "undefined" ||
    typeof restaurantDesc === "undefined" ||
    typeof restaurantLat === "undefined" ||
    typeof restaurantLong === "undefined" ||
    typeof restaurantTypeId === "undefined" ||
    typeof restaurantAddress === "undefined"
  ) {
    res.status(500).send({
      error: true,
      message: "can not get data from all required parameter"
    });
  }
  next();
});

router.put(
  "/addRestaurant",
  uploadToS3.single("restaurantPicture"),
  (req, res) => {
    let restaurantPicturePath;
    if (typeof req.file === "undefined") {
      restaurantPicturePath = null;
    } else {
      restaurantPicturePath = req.file.key;
    }
    let {
      restaurantName,
      restaurantOpenTime,
      restaurantCloseTime,
      restaurantOpenDate,
      restaurantDesc,
      restaurantLat,
      restaurantLong,
      restaurantTypeId,
      restaurantAddress
    } = req.body;
    addRestaurant(
      restaurantName,
      restaurantTypeId,
      restaurantOpenTime,
      restaurantCloseTime,
      restaurantOpenDate,
      restaurantPicturePath,
      restaurantDesc,
      restaurantAddress,
      restaurantLat,
      restaurantLong,
      (errorStatus, restaurantResult) => {
        if (errorStatus) {
          res.status(500).send({
            error: true,
            message: "error occur while adding new restaurant"
          });
          return;
        } else {
          res.status(200).send({
            error: false,
            restaurant: restaurantResult
          });
          return;
        }
      }
    );
  }
);

async function getRestaurantDetail(restaurantId, callback) {
  try {
    await restaurant.aggregate([
      {
        $lookup: {
          from: "restaurantTypes",
          localField: "restaurantTypeId",
          foreignField: "restaurantTypeId",
          as: "restaurantDescObj"
        }
      },
      {
        $match: {
          restaurantId: restaurantId
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
          restaurantDesc: "$restaurantTypes.restaurantTypeDesc",
          restaurantOpenTime: 1,
          restaurantCloseTime: 1,
          restaurantOpenDate: 1,
          restaurantPicturePath: 1,
          restaurantDesc: 1,
          restaurantAddress: 1,
          restaurantLat: 1,
          restaurantLong: 1
        }
      }
    ]);
  } catch (error) {
    console.log(error);
    callback(true, null);
  }
}

async function addRestaurant(
  restaurantName,
  restaurantTypeId,
  restaurantOpenTime,
  restaurantCloseTime,
  restaurantOpenDate,
  restaurantPicturePath,
  restaurantDesc,
  restaurantAddress,
  restaurantLat,
  restaurantLong,
  callback
) {
  try {
    let newRestaurantData = new restaurant({
      restaurantName: restaurantName,
      restaurantRating: null,
      restaurantTypeId: restaurantTypeId,
      restaurantOpenTime: restaurantOpenTime,
      restaurantCloseTime: restaurantCloseTime,
      restaurantOpenDate: restaurantOpenDate,
      restaurantPicturePath: restaurantPicturePath,
      restaurantDesc: restaurantDesc,
      restaurantAddress: restaurantAddress,
      restaurantLat: restaurantLat,
      restaurantLong: restaurantLong
    });
    await newRestaurantData.save((err, doc) => {
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

module.exports = router;
