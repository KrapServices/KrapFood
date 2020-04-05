const express = require('express');
const customerService = require('../services/user/customer');

const router = express.Router();

// Get riders managed by manager

router.get('/cc/:id', customerService.customerCreditCardInfo);

router.post('/cc/', customerService.customerCreateCreditCard);

router.get('/promotions/', customerService.getPromotions);

router.get('/locations/:id', customerService.getDeliveryLocations);

router.patch('/rateOrder/', customerService.rateOrder);

router.post('/rateFood/', customerService.rateFood);

router.get('/:id', customerService.getCustomer);

module.exports = router;
