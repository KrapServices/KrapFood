const express = require('express');
const orderServices = require('../services/orders');

const router = express.Router();

router.get('/', orderServices.getAllOrders);

router.get('/:id', orderServices.getOrderById);

router.get('/:id/foods', orderServices.getFoodInOrderById);

router.get('/userId/:id', orderServices.getOrderByUserId);

router.get('/riderId/:id', orderServices.getOrderByRiderId);

router.get('/restaurantId/:id', orderServices.getOrderByRestaurantId);

router.patch('/departToRestaurant/:id', orderServices.updateOrderTimingDepartureToRestaurant);

router.patch('/arriveAtRestaurant/:id', orderServices.updateOrderTimingArrival);

router.patch('/departFromRestaurant/:id', orderServices.updateOrderTimingDepartureFromRestaurant);

router.patch('/:id', orderServices.updateOrderStatus);

router.post('/', orderServices.createOrder);

module.exports = router;
