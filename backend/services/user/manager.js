const { query, transact } = require('../../database');

// =============================================================================
// MANAGERS
// =============================================================================

// Create manager
const managerCreate = async (req, res) => {
  try {
    const { email, password } = req.body;

    await transact(async (transactQuery) => {
      const user = (await transactQuery(
        `
          INSERT INTO users (email, password)
          VALUES ($1, $2)
          RETURNING user_id
        `,
        [email, password],
      )).rows[0];

      (await transactQuery(
        `
          INSERT INTO managers (manager_id) 
          VALUES ($1)
        `,
        [user.user_id],
      ));
    });

    res.status(201).send('Manager created');
  } catch (error) {
    console.error(error);
    res.status(500).send('error occured');
  }
};

const managerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = (await query(
      `
        SELECT manager_id FROM managers 
        WHERE EXISTS ( 
          SELECT 1
          FROM users 
          WHERE email = $1 
          AND password = $2
          AND manager_id = user_id
        )
      `,
      [email, password],
    )).rows[0];
    user.type = 'manager';
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Manager cannot be found');
  }
};

const updateManagerPassword = async (req, res) => {
  const { manager_id: managerId, password } = req.body;

  if (managerId === undefined || password === undefined) {
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
      [managerId, password],
    );

    res.status(200).send('Password updated.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Password update failed.');
  }
};

const getRiders = async (req, res) => {
  const { id: managerId } = req.params;

  if (Number.isNaN(managerId) || !Number.isInteger(parseInt(managerId, 10))) {
    res.status(400).send('Invalid request');
    return;
  }

  try {
    const partTimeRiders = (await query(
      `
        SELECT rider_id
        FROM part_time_riders
      `,
    )).rows.map((rider) => ({
      id: rider.rider_id,
      status: 'part-time',
    }));

    const fullTimeRiders = (await query(
      `
        SELECT rider_id
        FROM full_time_riders
      `,
    )).rows.map((rider) => ({
      id: rider.rider_id,
      status: 'full-time',
    }));

    res.status(200).send({ riders: partTimeRiders.concat(fullTimeRiders) });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to retrieve riders.');
  }
};

const checkSchedule = async (req, res) => {
  try {
    const { workDate, startingTime, endingTime } = req.body;

    const result = (await query(
      `
      With currentShifts AS (
        SELECT DISTINCT shift_id 
        FROM SHIFTS s 
        where s.work_date = $1
        and s.starting_time = $2
        and s.ending_time = $3
      )
          SELECT distinct r.rider_id
          FROM ( mws_contains ms right join ft_rider_works r on ms.mws_id = r.mws_id ) natural join currentShifts
          UNION
          SELECT distinct p.rider_id 
          FROM (wws_contains ws right join pt_rider_works p on ws.wws_id = p.wws_id ) natural join currentShifts
      `,
      [workDate, startingTime, endingTime],
    )).rows.map((rider) => ({
      riderId: rider.rider_id,
    }));
    if (result.length >= 5) {
      return res.status(200).send({ riders: result });
    }
    return res.status(500).send({ riders: result.row });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Something went wrong');
  }
};

const deleteManager = async (request, response) => {
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
};

module.exports = {
  managerLogin,
  managerCreate,
  updateManagerPassword,
  getRiders,
  checkSchedule,
  deleteManager,
};
