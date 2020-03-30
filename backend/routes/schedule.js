const express = require('express');
const { transact, query } = require('../database');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { riderId, startDate, shifts } = req.body;

    // Sort according to day then hour
    shifts.sort((a, b) => {
      if (a.day === b.day) {
        return a.hour - b.hour;
      }
      return a.day - b.day;
    });

    // Combine timeslots into shift intervals
    const intervals = [];
    let currentInterval;
    shifts.forEach((shift) => {
      const { day, hour } = shift;

      if (currentInterval === undefined) {
        currentInterval = {
          dayOfWeek: day,
          startHour: hour,
          endHour: hour + 1,
        };
      } else {
        const { dayOfWeek, startHour, endHour } = currentInterval;
        if (dayOfWeek === day && hour === endHour) {
          currentInterval = {
            dayOfWeek,
            startHour,
            endHour: hour + 1,
          };
        } else {
          intervals.push(currentInterval);
          currentInterval = {
            dayOfWeek: day,
            startHour: hour,
            endHour: hour + 1,
          };
        }
      }
    });
    intervals.push(currentInterval);

    // Insert into database
    await transact(async (query) => {
      const { schedule_id: scheduleId } = (await query(
        `
          INSERT INTO weekly_work_schedule (rider_id, first_date)
          VALUES ($1, $2)
          RETURNING schedule_id
        `,
        [riderId, startDate],
      )).rows[0];

      await Promise.all(intervals.map((interval) => {
        const { dayOfWeek, startHour, endHour } = interval;
        return query(
          `
            INSERT INTO wws_consists (schedule_id, day_of_week, start_hour, end_hour)
            VALUES ($1, $2, $3, $4)
          `,
          [scheduleId, dayOfWeek, `${startHour}00`, `${endHour}00`],
        );
      }));
    });

    res.status(201).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

router.get('/:id', async (req, res) => {
  const { id: riderId } = req.params;

  try {
    const shifts = (await query(
      `
        SELECT first_date, day_of_week, start_hour, end_hour
        FROM weekly_work_schedule NATURAL JOIN wws_consists
        WHERE rider_id = $1
      `,
      [riderId],
    )).rows.map((shift) => {
      const date = new Date(shift.first_date);
      date.setDate(shift.first_date.getDate() + (shift.day_of_week - 1));
      return {
        date,
        startHour: shift.start_hour,
        endHour: shift.end_hour,
      };
    });

    res.status(200).json({ shifts });
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

module.exports = router;
