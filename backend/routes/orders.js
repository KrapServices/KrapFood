const express = require('express');
const orderServices = require('../services/orders');

const router = express.Router();

router.get('/', orderServices.getAllOrders);

router.get('/:id', orderServices.getOrderById);

router.get('/foodInOrder/:id', orderServices.getFoodInOrderById);

router.get('/userId/:id', orderServices.getOrderByUserId);

router.get('/riderId/:id', orderServices.getOrderByRiderId);

router.get('/restaurantId/:id', orderServices.getOrderByRestaurantId);

router.patch('/:id', orderServices.updateOrderStatus);

router.post('/', orderServices.createOrder);

module.exports = router;
