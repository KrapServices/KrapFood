const express = require('express');
const services = require('../services/restaurants');

const router = express.Router();


router.get('/', services.getAllRestaurant);

router.post('/create', services.createPromotion);

router.get('/:id/food', services.getMenuById);

router.get('/:id/monthlystats', services.getMonthlyStatsById);

router.get('/:id/promostats', services.getPromoStatsById);

router.get('/:id/promo', services.getValidPromotionsById);

router.get('/:id/months', services.getMonthsById);

router.get('/:id', services.getRestaurantById);

router.post('/', services.createRestaurant);

module.exports = router;
