var express = require("express");
const services = require("../services");
var router = express.Router();


router.get("/getAll", services.getAllRestaurant);

//router.post("/:id", services.getRestaurantById);

router.post("/createRestaurant", services.createRestaurant);


router.get("/restaurants", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.send("restaurants api working");
});

module.exports = router;
