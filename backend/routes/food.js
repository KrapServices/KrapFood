const express = require('express');
const foodServices = require('../services/foods');

const router = express.Router();

router.post('/create', foodServices.createFood);

module.exports = router;