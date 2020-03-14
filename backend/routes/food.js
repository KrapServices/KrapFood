var express = require("express");
const foodServices = require("../services/foods");
var router = express.Router();

router.post("/create", foodServices.createFood);

module.exports = router;

