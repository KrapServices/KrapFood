const express = require('express');
const orderServices = require('../services/orders');

const router = express.Router();

router.get('/', orderServices.getAllOrders);

router.get('/:id', orderServices.getOrderById);

router.get('/userId/:id', orderServices.getOrderByUserId);

router.post('/', orderServices.createOrder);

module.exports = router;
