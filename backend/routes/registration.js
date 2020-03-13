var express = require("express");
const cxServices = require("../services/customer");
const managerServices = require("../services/manager");

var router = express.Router();

router.post("/customer/sign-up", cxServices.customerCreate);

router.post("/customer/login", cxServices.customerLogin);

//router.post("/rider/sign-up", );

//router.post("/rider/login", );

router.post("/manager/sign-up", managerServices.managerCreate);

router.post("/manager/login", managerServices.managerLogin);

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
