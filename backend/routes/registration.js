var express = require("express");
const services = require("../services");
var router = express.Router();

router.post("/customer/sign-up", services.customerCreate);

router.post("/customer/login", services.customerLogin);

//router.post("/rider/sign-up", );

//router.post("/rider/login", );

router.post("/manager/sign-up", services.managerCreate);

router.post("/manager/login", services.managerLogin);

//router.post("/staff/sign-up", );

//router.post("/staff/login", );


router.get("/registrations", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.send("registration api working");
});

module.exports = router;
