const express = require('express');
const managerService = require('../services/user/manager');

const router = express.Router();

// Update manager password
router.patch('/', managerService.updateManagerPassword);

module.exports = router;
