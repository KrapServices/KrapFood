const express = require('express');
const customerService = require('../services/user/customer');

const router = express.Router();

// Get riders managed by manager

router.get('/cc/:id', customerService.customerCreditCardInfo);

router.get('/getUser/:id', customerService.getUser);

router.post('/cc/', customerService.customerCreateCreditCard);

router.get('/promotions/', customerService.getCustomerPromotions);

router.get('/locations/:id', customerService.getDeliveryLocations);

router.patch('/orders/ratings', customerService.rateOrder);

router.post('/food/ratings', customerService.rateFood);

router.get('/:id', customerService.getCustomerById);

router.delete('/:id', customerService.deleteCustomerById);

router.patch('/password', customerService.updateCustomerPassword);

router.patch('/name', customerService.updateCustomerName);

router.patch('/email', customerService.updateCustomerEmail);

module.exports = router;
