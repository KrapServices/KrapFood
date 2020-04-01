const express = require('express');
const foodServices = require('../services/foods');

const router = express.Router();

router.post('/create', foodServices.createFood);
router.patch('/update', foodServices.updateItem);


module.exports = router;
