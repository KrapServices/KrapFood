const express = require('express');
const services = require('../services/restaurants');

const router = express.Router();


router.get('/', services.getAllRestaurant);

router.get('/:id', services.getRestaurantById);

router.post('/', services.createRestaurant);

module.exports = router;
