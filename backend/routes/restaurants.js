const express = require('express');
const services = require('../services/restaurants');

const router = express.Router();


router.get('/', services.getAllRestaurant);

router.get('/:id', services.getRestaurantById);

router.get('/:id/food', services.getMenuById);

router.get('/:id/stats', services.getStatsById);

router.get('/:id/months', services.getMonthsById);

router.post('/', services.createRestaurant);

module.exports = router;
