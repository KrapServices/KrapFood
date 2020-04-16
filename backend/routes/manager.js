const express = require('express');
const managerService = require('../services/user/manager');

const router = express.Router();

// Update manager password
router.patch('/', managerService.updateManagerPassword);
// Get riders managed by manager
router.get('/:id/riders', managerService.getRiders);
// Check Schedule
router.post('/schedule', managerService.checkSchedule);

module.exports = router;
