var express = require("express");
const services = require("../services/orders");
var router = express.Router();


router.get("/", services.getAllRestaurant);

router.get("/:id", services.getRestaurantById);

router.post("/", services.createRestaurant);

module.exports = router;
