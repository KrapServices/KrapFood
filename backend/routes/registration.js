var express = require("express");
const cxServices = require("../services/user/customer");
const riderServices = require("../services/user/rider");
const managerServices = require("../services/user/manager");
const staffServices = require("../services/user/staff");

var router = express.Router();

router.post("/customer/sign-up", cxServices.customerCreate);

router.post("/customer/login", cxServices.customerLogin);

router.post("/rider/sign-up", riderServices.riderCreate);

router.post("/rider/login", riderServices.riderLogin);

router.post("/manager/sign-up", managerServices.managerCreate);

router.post("/manager/login", managerServices.managerLogin);

router.post("/staff/sign-up", staffServices.staffCreate);

router.post("/staff/login", staffServices.staffLogin);


router.get("/registrations", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.send("registration api working");
});

module.exports = router;
