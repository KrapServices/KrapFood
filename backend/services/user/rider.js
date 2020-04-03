const { query, transact } = require('../../database');
// =============================================================================
// RIDERS
// =============================================================================

// create single user for rider
const riderCreate = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await transact(async (query) => {
      const user = (await query(
        'INSERT INTO users (email , password) VALUES ($1,$2) RETURNING user_id',
        [email, password],
      )).rows[0];
      (await query(
        'INSERT INTO riders (rider_id) VALUES ($1) RETURNING rider_id',
        [user.user_id],
      ));
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

    response.status(200).json({ user: rider });
  } catch (error) {
    console.error(error);
    response.status(500).send('user cannot be found');
  }
};

module.exports = {
  riderCreate,
  riderLogin,
};
