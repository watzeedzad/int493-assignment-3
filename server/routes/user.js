let express = require("express");
let router = express.Router();
let user = require("../model/User");
let crypto = require("crypto");
let jwt = require("jwt-simple");
let multer = require("multer");
let multer_s3 = require("multer-s3");
let aws = require("aws-sdk");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
require("dotenv").config();

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
      cb(null, "photos/users/" + Date.now().toString() + "." + fileExtension);
    }
  })
});

const loginMiddleWare = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (typeof username === "undefined" || typeof password === "undefined") {
    res.status(500).send({
      error: true,
      message: "can not get data from all required parameter"
    });
    return;
  } else {
    login(username, loginData => {
      req.loginData = loginData;
      next();
    });
  }
};

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

router.post("/login", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.post("/login", loginMiddleWare, (req, res) => {
  let loginData = req.loginData;
  let password = req.body.password;

  if (loginData == null) {
    res.status(200).send({
      error: true,
      message: "user not found!"
    });
    return;
  }

  let userSaltValue = loginData.salt;
  let userSaltedPassword = loginData.password;
  var sha512 = function(password, salt) {
    var hash = crypto.createHmac(
      "sha512",
      salt
    ); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest("hex");
    return {
      salt: salt,
      passwordHash: value
    };
  };

  console.log(password, userSaltValue);
  var userInputPasswordData = sha512(password, userSaltValue);
  if (userInputPasswordData.passwordHash == userSaltedPassword) {
    const jwtToken = jwt.encode(
      {
        sub: loginData.userId,
        username: loginData.username,
        email: loginData.email,
        firstname: loginData.firstname,
        lastname: loginData.lastname,
        tel: loginData.tel,
        userPicturePath: loginData.userPicturePath,
        iat: new Date().getTime()
      },
      process.env.JWT_SECRET
    );
    res.status(200).send({
      token: "bearer " + jwtToken
    });
  } else {
    res.status(200).send({
      error: true,
      message: "wrong username or password"
    });
  }
});

router.post(
  "/register",
  uploadToS3.single("profilePicture"),
  (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    let { username, password, email, firstname, lastname, tel } = req.body;
    if (
      typeof username === "undefined" ||
      typeof password === "undefined" ||
      typeof email === "undefined" ||
      typeof firstname === "undefined" ||
      typeof lastname === "undefined" ||
      typeof tel === "undefined"
    ) {
      res.status(500).send({
        error: true,
        message: "can not get data from all required parameter"
      });
      return;
    }
    next();
  }
);

router.post("/register", (req, res) => {
  let { username, password, email, firstname, lastname, tel } = req.body;
  let profilePicturePath;
  if (typeof req.file === "undefined") {
    profilePicturePath = null;
  } else {
    profilePicturePath = req.file.location;
  }
  isUserExist(username, isUserExist => {
    if (isUserExist) {
      res.status(200).send({
        error: true,
        errorMessage: "user already exist"
      });
      return;
    }

    var genRandomString = function(length) {
      return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex") /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
    };

    var sha512 = function(password, salt) {
      var hash = crypto.createHmac(
        "sha512",
        salt
      ); /** Hashing algorithm sha512 */
      hash.update(password);
      var value = hash.digest("hex");
      return {
        salt: salt,
        passwordHash: value
      };
    };

    var salt = genRandomString(16);
    var passwordData = sha512(password, salt);

    addUser(
      username,
      passwordData.passwordHash,
      passwordData.salt,
      email,
      firstname,
      lastname,
      tel,
      profilePicturePath,
      errorStatus => {
        if (errorStatus) {
          res.status(500).send({
            status: error,
            errorMessage: "error occur while create new user"
          });
          return;
        } else {
          res.sendStatus(200);
          return;
        }
      }
    );
  });
});

router.put("/editUser", requireJWTAuth, (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.put("/editUser", uploadToS3.single("profilePicture"), (req, res) => {
  let { email, firstname, lastname, tel } = req.body;
  let userId = req.user.userId;
  let userPicturePath;

  if (typeof req.file === "undefined") {
    userPicturePath = null;
  } else {
    userPicturePath = req.file.location;
  }

  if (
    typeof email === "undefined" ||
    typeof firstname === "undefined" ||
    typeof lastname === "undefined" ||
    typeof tel === "undefined"
  ) {
    res.status(500).send({
      error: true,
      message: "can not get data from all required parameter"
    });
    return;
  }

  editUser(
    userId,
    email,
    firstname,
    lastname,
    tel,
    userPicturePath,
    (editUserStatus, editUserResultData) => {
      if (editUserStatus) {
        res.status(500).send({
          error: true,
          message: "error occur while update user info"
        });
      } else {
        const jwtToken = jwt.encode(
          {
            sub: editUserResultData.userId,
            username: editUserResultData.username,
            email: editUserResultData.email,
            firstname: editUserResultData.firstname,
            lastname: editUserResultData.lastname,
            tel: editUserResultData.tel,
            userPicturePath: editUserResultData.userPicturePath,
            iat: new Date().getTime()
          },
          process.env.JWT_SECRET
        );
        res.status(200).send({
          error: false,
          token: "bearer " + jwtToken
        });
      }
    }
  );
});

async function editUser(userId, email, firstname, lastname, tel, userPicturePath, callback) {
  try {
    await user.findOneAndUpdate(
      {
        userId: userId
      },
      {
        $set: {
          email: email,
          firstname: firstname,
          lastname: lastname,
          tel: tel,
          userPicturePath: userPicturePath
        }
      },
      { new: true },
      (err, doc) => {
        if (err) {
          callback(true, null);
        } else if (!doc) {
          callback(true, null);
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
          callback(null);
        } else {
          callback(result);
        }
      }
    );
  } catch (error) {
    console.log;
    callback(null);
  }
}

async function isUserExist(username, callback) {
  try {
    await user.findOne(
      {
        username: username
      },
      (err, result) => {
        if (err) {
          console.log(err);
          callback(false);
        } else if (!result) {
          callback(false);
        } else {
          callback(true);
        }
      }
    );
  } catch (error) {
    console.log(error);
    callback(false);
  }
}

async function addUser(
  username,
  password,
  salt,
  email,
  firstname,
  lastname,
  tel,
  userPicturePath,
  callback
) {
  try {
    let newUserData = new user({
      username: username,
      password: password,
      salt: salt,
      email: email,
      firstname: firstname,
      lastname: lastname,
      tel: tel,
      userPicturePath: userPicturePath
    });
    await newUserData.save((err, doc) => {
      if (err) {
        console.log(er);
        callback(true);
      } else if (!doc) {
        callback(true);
      } else {
        callback(false);
      }
    });
  } catch (error) {
    console.log(error);
    callback(false);
  }
}

module.exports = router;
