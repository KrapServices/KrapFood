const express = require('express');
const customerService = require('../services/user/customer');

const router = express.Router();

// Get riders managed by manager
router.get('/cc/:id', customerService.customerCreditCardInfo);

module.exports = router;
