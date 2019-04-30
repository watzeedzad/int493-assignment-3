var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// let cors = require("cors");
let mongoose = require("mongoose");
require("dotenv").config();

db_uri = process.env.DB_URI;

mongoose.Promise = global.Promise;
let connection = mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
    dbName: "kmutt-restaurant"
  })
  .then(console.log("MongoDb Connected"))
  .catch(err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });

let homeRouter = require("./routes/home");
let restaurantRouter = require("./routes/restaurant");
let reviewRouter = require("./routes/review");
let userRouter = require("./routes/user");

var app = express();

origin_url = process.env.ORIGIN_URL;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(
//   cors({
//     origin: [origin_url],
//     methods: ["GET", "POST"],
//   })
// );
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/home", homeRouter);
app.use("/restaurant", restaurantRouter);
app.use("/review", reviewRouter);
app.use("/user", userRouter);

module.exports = app;
