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

    return res.status(200).json({
      user: {
        ...user,
        type: 'manager',
      },
    });
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
        FROM managers NATURAL JOIN manages NATURAL JOIN riders NATURAL JOIN part_time_riders
        WHERE manager_id = $1
      `,
      [managerId],
    )).rows.map((rider) => ({
      id: rider.rider_id,
      status: 'part-time',
    }));

    const fullTimeRiders = (await query(
      `
        SELECT rider_id
        FROM managers NATURAL JOIN manages NATURAL JOIN riders NATURAL JOIN full_time_riders
        WHERE manager_id = $1
      `,
      [managerId],
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

module.exports = {
  managerLogin,
  managerCreate,
  updateManagerPassword,
  getRiders,
};
