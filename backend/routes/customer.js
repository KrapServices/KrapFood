const express = require('express');
const customerService = require('../services/user/customer');

const router = express.Router();

// Get riders managed by manager
router.get('/cc/:id', customerService.customerCreditCardInfo);

router.post('/cc/', customerService.customerCreateCreditCard);

module.exports = router;
