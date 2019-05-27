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
let user = require("../model/User");
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
      cb(
        null,
        "photos/restaurants/" + Date.now().toString() + "." + fileExtension
      );
    }
  })
});

router.get("/getRestaurantDetail", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.get("/getRestaurantDetail", (req, res) => {
  let restaurantId = parseInt(req.query.restaurantId);

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

router.post("/addRestaurant", requireJWTAuth, (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.post(
  "/addRestaurant",
  uploadToS3.single("restaurantPicture"),
  (req, res) => {
    let restaurantPicturePath;
    if (typeof req.file === "undefined") {
      restaurantPicturePath = null;
    } else {
      restaurantPicturePath = req.file.location;
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
      restaurantAddress,
      restaurantTel
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
      return;
    }
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
      restaurantTel,
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

router.put("/editRestaurant", requireJWTAuth, (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.put(
  "/editRestaurant",
  uploadToS3.single("restaurantPicture"),
  (req, res) => {
    let restaurantPicturePath;
    let {
      restaurantId,
      restaurantName,
      restaurantTypeId,
      restaurantOpenTime,
      restaurantCloseTime,
      restaurantOpenDate,
      restaurantDesc,
      restaurantAddress,
      restaurantLat,
      restaurantLong,
      restaurantTel
    } = req.body;

    if (
      typeof restaurantId === "undefined" ||
      typeof restaurantName === "undefined" ||
      typeof restaurantOpenTime === "undefined" ||
      typeof restaurantCloseTime === "undefined" ||
      typeof restaurantOpenDate === "undefined" ||
      typeof restaurantDesc === "undefined" ||
      typeof restaurantLat === "undefined" ||
      typeof restaurantLong === "undefined" ||
      typeof restaurantTypeId === "undefined" ||
      typeof restaurantAddress === "undefined" ||
      typeof restaurantTel === "undefined"
    ) {
      res.status(500).send({
        error: true,
        message: "can not get data from all required parameter"
      });
      return;
    }
    if (typeof req.file === "undefined") {
      restaurantPicturePath = null;
    } else {
      restaurantPicturePath = req.file.location;
    }

    editRestaurant(
      restaurantId,
      restaurantName,
      restaurantTypeId,
      restaurantOpenTime,
      restaurantCloseTime,
      restaurantPicturePath,
      restaurantDesc,
      restaurantAddress,
      restaurantLat,
      restaurantLong,
      restaurantTel,
      (errorStatus, editRestaurantData) => {
        if (errorStatus) {
          res.status(500).send({
            error: true,
            message: "error occur while updating restaurant"
          });
          return;
        } else {
          res.status(200).send({
            error: false,
            editRestaurantData: editRestaurantData
          });
          return;
        }
      }
    );
  }
);

router.put("/addRestaurantType", requireJWTAuth, (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.post("/addRestaurantType", (req, res) => {
  let { restaurantTypeDesc } = req.body;

  if (typeof restaurantTypeDesc === "undefined") {
    res.status(500).send({
      error: true,
      message: "can not get data from all required parameter"
    });
    return;
  }

  addRestaurantType(restaurantTypeDesc, (errorStatus, restaurantResult) => {
    if (errorStatus) {
      res.status(500).send({
        error: true,
        message: "error occur while adding new restaurant type"
      });
      return;
    } else {
      res.status(200).send({
        error: false,
        restaurant: restaurantResult
      });
      return;
    }
  });
});

async function editRestaurant(
  restaurantId,
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
  restaurantTel,
  callback
) {
  try {
    await restaurant.findOneAndUpdate(
      {
        restaurantId: restaurantId
      },
      {
        $set: {
          restaurantName: restaurantName,
          restaurantTypeId: restaurantTypeId,
          restaurantOpenTime: restaurantOpenTime,
          restaurantCloseTime: restaurantCloseTime,
          restaurantOpenDate: restaurantOpenDate,
          restaurantPicturePath: restaurantPicturePath,
          restaurantDesc: restaurantDesc,
          restaurantAddress: restaurantAddress,
          restaurantLat: restaurantLat,
          restaurantLong: restaurantLong,
          restaurantTel: restaurantTel
        }
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          callback(true, null);
        } else if (!doc) {
          callbackA(true, null);
        } else {
          callback(false, doc);
        }
      }
    );
  } catch (error) {
    console.log(error);
    callback(true, null);
  }
}

async function getRestaurantDetail(restaurantId, callback) {
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
          $match: {
            restaurantId: restaurantId
          }
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
            restaurantTel: 1
          }
        }
      ],
      (err, result) => {
        if (err) {
          callback(true, null);
        } else if (!result) {
          callback(true, null);
        } else {
          callback(false, result);
        }
      }
    );
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
  restaurantTel,
  callback
) {
  try {
    let newRestaurantData = new restaurant({
      restaurantName: restaurantName,
      restaurantRating: 0,
      restaurantTypeId: restaurantTypeId,
      restaurantOpenTime: restaurantOpenTime,
      restaurantCloseTime: restaurantCloseTime,
      restaurantOpenDate: restaurantOpenDate,
      restaurantPicturePath: restaurantPicturePath,
      restaurantDesc: restaurantDesc,
      restaurantAddress: restaurantAddress,
      restaurantLat: restaurantLat,
      restaurantLong: restaurantLong,
      restaurantTel: restaurantTel
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

async function addRestaurantType(restaurantTypeDesc, callback) {
  try {
    const newRestaurantType = new restaurantType({
      restaurantTypeDesc: restaurantTypeDesc
    });
    await newRestaurantType.save((err, doc) => {
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
