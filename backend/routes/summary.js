const express = require('express');
const services = require('../services/summary');

const router = express.Router();

router.get('/riders', services.getRiderStatsByMonth);
router.get('/locations', services.getDeliveryLocations);
router.get('/orders', services.getOrderCountByLocation);
router.get('/customers', services.getCustomerStatistics);
router.get('/months', services.getAllOrderMonths);

module.exports = router;
