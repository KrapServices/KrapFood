const { query, transact } = require('../../database');
// =============================================================================
// RIDERS
// =============================================================================

// default

// create single user for rider
const riderCreate = async (request, response) => {
  try {
    const { email, password, shiftType } = request.body;
    const result = await transact(async (query) => {
      const user = (await query(
        'INSERT INTO users (email , password) VALUES ($1,$2) RETURNING user_id',
        [email, password],
      )).rows[0];
      (await query(
        'INSERT INTO riders (rider_id) VALUES ($1) RETURNING rider_id',
        [user.user_id],
      ));
      if (shiftType === 'part time') {
        await (query(
          'INSERT INTO part_time_riders (rider_id) VALUES ($1) returning rider_id',
          [user.user_id],
        ));
      } else {
        await (query('INSERT INTO full_time_riders (rider_id) VALUES ($1) returning rider_id',
          [user.user_id]));
      }
      console.log(shiftType);
      return user;
    });
    response.status(201).send('user created');
  } catch (error) {
    console.log(error);
    return response.status(500).send('error occured');
  }
};


const riderLogin = async (request, response) => {
  try {
    const { email, password } = request.body;

    const rider = (await query(
      `
        SELECT rider_id, 'rider' AS type, 'part' AS status
        FROM users JOIN riders ON user_id = rider_id NATURAL JOIN part_time_riders
        WHERE email = $1
        AND password = $2
        UNION
        SELECT rider_id, 'rider' AS type, 'full' AS status
        FROM users JOIN riders ON user_id = rider_id NATURAL JOIN full_time_riders
        WHERE email = $1
        AND password = $2
      `,
      [email, password],
    )).rows[0];
    rider.type = 'rider';
    response.status(200).json({ user: rider });
  } catch (error) {
    console.error(error);
    response.status(500).send('user cannot be found');
  }
};

const getRiderStats = async (request, response) => {
  try {
    const { id: riderId, start_date, end_date } = request.query;
    const stats = (await query(
      `
      WITH rider_commission AS (
        SELECT d.rider_id, sum(o.delivery_fee) AS commission
        FROM delivers d JOIN orders o on d.order_id = o.order_id and o.status = 'completed'
        WHERE DATE(o.created_at) >= DATE($2) OR DATE(o.created_at) <= DATE($3) 
        GROUP BY d.rider_id
      ), 
      rider_hours AS (
        SELECT rider_id,
        CASE 
          WHEN rider_id IN (SELECT rider_id FROM part_time_riders PT) THEN 
            (SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
            FROM PT_rider_works p JOIN (wws_contains c JOIN shifts s on c.shift_id = s.shift_id) ON c.wws_id = p.wws_id
            WHERE DATE(s.work_date) >= DATE($2) OR DATE(s.work_date) <= DATE($3))
          WHEN rider_id in (SELECT rider_id FROM full_time_riders FT) THEN
            (SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
            FROM FT_rider_works f JOIN (mws_contains c JOIN shifts s on c.shift_id = s.shift_id) ON c.mws_id = f.mws_id
            WHERE DATE(s.work_date) >= DATE($2) OR DATE(s.work_date) <= DATE($3))
          ELSE 0
        END AS hours 
        FROM riders
      ),
      order_count AS (
        SELECT d.rider_id, COUNT(d.order_id) AS total_orders
        FROM delivers d, orders o
        WHERE o.order_id = d.order_id
        AND (DATE(o.created_at) >= DATE($2) OR DATE(o.created_at) <= DATE($3)) 
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
      `,
      [riderId],
    )).rows.map((rider) => ({
      orderCount: rider.order_count,
      totalPay: rider.total_pay,
      totalHours: rider.total_hours,
    }));
    response.status(200).json({ stats });
  } catch (error) {
    console.error(error);
    response.status(500).send('unable to retrieve rider pay');
  }
};

module.exports = {
  riderCreate,
  riderLogin,
  getRiderStats,
};
