const express = require('express');
const services = require('../services/restaurants');

const router = express.Router();


router.get('/', services.getAllRestaurant);

router.get('/:id', services.getRestaurantById);

router.post('/', services.createRestaurant);

router.get('/stats/orders/:id', services.getTotalOrders);

router.get('/stats/top/:id', services.getTopFive);

router.get('/stats/cost/:id', services.getTotalCost);

module.exports = router;
