const express = require('express');
const foodServices = require('../services/foods');

const router = express.Router();

router.post('/create', foodServices.createFood);
router.post('/menu/:id', foodServices.getMenu);

module.exports = router;