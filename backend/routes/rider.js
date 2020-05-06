const express = require('express');
const { transact, query } = require('../database');

const router = express.Router();

// Route to create new weekly work schedule
router.post('/:id/schedules', async (req, res) => {
  try {
    const { id: riderId } = req.params;
    const {
      startDate, endDate, shifts,
    } = req.body;

    await transact(async (transactQuery) => {
      const { scheduleId } = (await transactQuery(
        `
          INSERT INTO weekly_work_schedules (starting_date, ending_date)
          VALUES ($1, $2)
          RETURNING wws_id
        `,
        [startDate, endDate],
      )).rows.map((schedule) => ({
        scheduleId: schedule.wws_id,
      }))[0];

      await Promise.all(shifts.map(async ({ date, startTime, endTime }) => {
        const { shiftId } = (await transactQuery(
          `
            INSERT INTO shifts (work_date, starting_time, ending_time)
            VALUES ($1, $2, $3)
            RETURNING shift_id
          `,
          [date, startTime, endTime],
        )).rows.map((shift) => ({
          shiftId: shift.shift_id,
        }))[0];

        await transactQuery(
          `
            INSERT INTO wws_contains (wws_id, shift_id)
            VALUES ($1, $2)
          `,
          [scheduleId, shiftId],
        );
      }));

      await transactQuery(
        `
          INSERT INTO pt_rider_works (rider_id, wws_id)
          VALUES ($1, $2)
        `,
        [riderId, scheduleId],
      );
    });

    res.status(201).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

// Route to retrieve weekly work schedules
router.get('/:id/schedules', async (req, res) => {
  const { id: riderId } = req.params;

  try {
    const shifts = (await query(
      `
        SELECT work_date, starting_time, ending_time
        FROM pt_rider_works NATURAL JOIN weekly_work_schedules NATURAL JOIN wws_contains NATURAL JOIN shifts
        WHERE rider_id = $1
        ORDER BY work_date, starting_time
      `,
      [riderId],
    )).rows.map((shift) => ({
      date: shift.work_date,
      startTime: shift.starting_time,
      endTime: shift.ending_time,
    }));

    res.status(200).json({ shifts });
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

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
