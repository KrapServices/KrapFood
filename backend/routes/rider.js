const express = require('express');
const services = require('../services/riderServices');
const { query } = require('../database');

const router = express.Router();

// Route to create new weekly work schedule
router.post('/:id/schedules', services.createNewWeeklyWorkSchedule);

// Route to create new monthly work schedule
router.post('/:id/monthly-schedules', services.createNewMonthlyWorkSchedule);

// Route to retrieve weekly work schedules
router.get('/:id/schedules', services.retrieveWeeklyWorkSchedules);

// Route to retrieve monthly work schedules
router.get('/:id/monthly-schedules', services.retrieveMonthlyWorkSchedules);

router.get('/:id/ridersummary', services.getRiderStats);

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await query(
      `
        DELETE FROM users
        WHERE user_id = $1
      `,
      [id],
    );
    return response.status(204).send('Account successfully deleted');
  } catch (error) {
    console.log(error);
    return response.status(500).send('User cannot be found');
  }
});

router.patch('/', async (req, res) => {
  const { riderId, password } = req.body;

  if (riderId === undefined || password === undefined) {
    res.status(400).send('Invalid details');
    return;
  }

  try {
    await query(
      `
        UPDATE users
        SET
          password = $2,
          modified_at = DEFAULT
        WHERE user_id = $1
      `,
      [riderId, password],
    );

    res.status(200).send('Password updated.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Password update failed.');
  }
});

module.exports = router;
