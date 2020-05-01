const express = require('express');
const services = require('../services/summary');

const router = express.Router();

router.get('/locations', services.getDeliveryLocations);
router.get('/orders', services.getOrderCountByLocation);
router.get('/customers', services.getCustomerStatistics);

module.exports = router;
