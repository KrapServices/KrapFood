const { transact, query } = require('../database');

// =============================================================================
// RIDER SERVICES
// =============================================================================

// -----------------------------------------------------------------------------
// Utilty functions
// -----------------------------------------------------------------------------

const createNewWeeklyWorkSchedule = async (req, res) => {
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
};


const retrieveWeeklyWorkSchedules = async (req, res) => {
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
};

const getRiderStats = async (request, response) => {
  try {
    const { id: riderId } = request.params;
    const { startDate, endDate } = request.query;

    const stats = (await query(
      `WITH rider_commission AS (
        SELECT d.rider_id, sum(o.delivery_fee) AS commission
        FROM delivers d JOIN orders o on d.order_id = o.order_id and o.status = 'completed'
        WHERE o.created_at >= $2 AND o.created_at <= $3
        GROUP BY d.rider_id
      ), 
      rider_hours AS (
        SELECT rider_id,
        CASE 
          WHEN rider_id IN (SELECT rider_id FROM part_time_riders PT) THEN 
            (SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
            FROM PT_rider_works p JOIN (wws_contains c JOIN shifts s on c.shift_id = s.shift_id) ON c.wws_id = p.wws_id
            WHERE s.work_date >= $2 AND s.work_date <= $3)
          WHEN rider_id in (SELECT rider_id FROM full_time_riders FT) THEN
            (SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
            FROM FT_rider_works f JOIN (mws_contains c JOIN shifts s on c.shift_id = s.shift_id) ON c.mws_id = f.mws_id
            WHERE s.work_date >= $2 AND s.work_date <= $3)
          ELSE 0
        END AS hours 
        FROM riders
      ),
      order_count AS (
        SELECT d.rider_id, COUNT(d.order_id) AS total_orders
        FROM delivers d, orders o
        WHERE o.order_id = d.order_id
        AND o.created_at >= $2 AND o.created_at <= $3
        GROUP BY d.rider_id
      )
      SELECT d.rider_id, rh.hours AS total_hours, oc.total_orders AS total_orders, rc.commission + 
      CASE 
        WHEN d.rider_id IN (SELECT rider_id FROM part_time_riders) THEN
          (SELECT PT.salary_per_hour * rh.hours
           FROM part_time_riders PT, rider_hours rh)
        WHEN d.rider_id IN (SELECT rider_id FROM full_time_riders) THEN
        (SELECT ft.base_salary
        FROM full_time_riders ft)
      END AS rider_pay
      FROM ((delivers d JOIN rider_hours rh ON d.rider_id = rh.rider_id) JOIN order_count oc ON oc.rider_id = rh.rider_id) JOIN rider_commission rc ON rc.rider_id = rh.rider_id
      WHERE d.rider_id = $1
      `, [riderId, new Date(parseInt(startDate, 10)), new Date(parseInt(endDate, 10))],
    )).rows.map((rider) => ({
      orderCount: rider.total_orders,
      totalPay: rider.rider_pay,
      totalHours: rider.total_hours,
    }));

    response.status(200).json(stats);
    console.log(stats);
    console.log('wtf');
    console.log(response.data);
  } catch (error) {
    console.error(error);
    response.status(500).send('unable to retrieve rider stats');
  }
};

module.exports = {
  createNewWeeklyWorkSchedule,
  retrieveWeeklyWorkSchedules,
  getRiderStats,
};
