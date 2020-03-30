const express = require('express');
const foodServices = require('../services/foods');

const router = express.Router();

router.post('/create', foodServices.createFood);
router.get('/menu/:id', foodServices.getMenu);
router.post('/update', foodServices.updateAvailability);

module.exports = router;