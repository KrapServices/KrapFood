const express = require('express');
const services = require('../services/promotions');

const router = express.Router();

router.post('/createPromo', services.createPromotion);

router.get('/promoCampaign', services.getPromosWithCampaigns);

router.get('/promo', services.getPromotions);

router.get('/campaigns', services.getCampaigns);

router.post('/createCampaign', services.createCampaign);

module.exports = router;
