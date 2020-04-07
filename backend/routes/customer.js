const express = require('express');
const customerService = require('../services/user/customer');

const router = express.Router();

// Get riders managed by manager

router.get('/cc/:id', customerService.customerCreditCardInfo);

router.post('/cc/', customerService.customerCreateCreditCard);

router.get('/promotions/', customerService.getPromotions);

router.get('/locations/:id', customerService.getDeliveryLocations);

router.patch('/orders/ratings', customerService.rateOrder);

router.post('/food/ratings', customerService.rateFood);

router.get('/:id', customerService.getCustomerById);

module.exports = router;
