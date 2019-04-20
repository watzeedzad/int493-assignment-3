let express = require("express");
let router = express.Router();

router.get("/", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.get("/", (req, res) => {
  
});

module.exports = router;
