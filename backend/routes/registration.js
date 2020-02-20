var express = require("express");
const db = require("../database");
var router = express.Router();

router.post("/customer/sign-up", db.createCustomerUser);

router.post("/customer/login", db.customerLogin);

router.get("/", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.send("registration api working");
});

module.exports = router;
