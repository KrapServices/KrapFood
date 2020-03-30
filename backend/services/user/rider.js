const { query, transact } = require('../../database');
// =============================================================================
// RIDERS
// =============================================================================

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
      if(shiftType === "part time") {
        await(query (
          'INSERT INTO part_time_riders (rider_id, salary_per_hour) VALUES ($1, 0) returning rider_id',
          [user.user_id],))
      } else {
          await(query('INSERT INTO full_time_riders (rider_id, base_salary) VALUES ($1, 0) returning rider_id', 
          [user.user_id],))
      };
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
    const { email, password, shiftType } = request.body;

    const result = await transact(async (query) => {
      let user = (await query(
        'SELECT user_id, email, password FROM users WHERE email = $1 and password = $2',
        [email, password],
      )).rows[0];
      const rider = (await query(
        'SELECT rider_id FROM riders WHERE rider_id = $1',
        [user.user_id],
      )).rows[0];
        // append info to user object
      user.type = 'rider';
      user = { ...user, ...rider };
      //console.log(user);
      //console.log(shiftType);
      return user;
    });
    response.status(200).json({ user: result });
  } catch (error) {
    console.log(error);
    return response.status(500).send('user cannot be found');
  }
};


module.exports = {
  riderCreate,
  riderLogin,
};
