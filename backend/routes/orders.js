var express = require("express");
const orderServices = require("../services/orders");
var router = express.Router();

router.get("/", orderServices.getAllOrders);

router.get("/:id", orderServices.getOrderById);

router.post("/", orderServices.createOrder);

module.exports = router;
