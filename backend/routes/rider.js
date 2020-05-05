const express = require('express');
const services = require('../services/riderServices');

const router = express.Router();

// Route to create new weekly work schedule
router.post('/:id/schedules', services.createNewWeeklyWorkSchedule);

// Route to retrieve weekly work schedules
router.get('/:id/schedules', services.retrieveWeeklyWorkSchedules);

router.get('/:id/ridersummary', services.getRiderStats);

module.exports = router;
