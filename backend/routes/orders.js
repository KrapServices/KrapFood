const express = require('express');
const orderServices = require('../services/orders');

const router = express.Router();

router.get('/', orderServices.getAllOrders);

router.get('/:id', orderServices.getOrderById);

router.get('/userId/:id', orderServices.getOrderByUserId);

router.get('/riderId/:id', orderServices.getOrderByRiderId);

router.get('/delivering/:id', orderServices.updateOrderDelivering);

router.get('/complete/:id', orderServices.updateOrderCompleted);

router.post('/', orderServices.createOrder);

module.exports = router;
