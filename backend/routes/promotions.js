const express = require('express');
const services = require('../services/promotions');

const router = express.Router();

router.post('/create', services.createPromotion);

router.get('/promo', services.getPromotions);

module.exports = router;
