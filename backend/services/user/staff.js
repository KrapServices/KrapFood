const { query, transact } = require('../../database');
// =============================================================================
// STAFF
// =============================================================================

// create single user for staff
const staffCreate = async (request, response) => {
  try {
    const { email, password, restaurantId } = request.body;
    await transact(async (query) => {
      const user = (await query(
        `
          INSERT INTO users (email , password) 
          VALUES ($1,$2) 
          RETURNING user_id
        `,
        [email, password],
      )).rows[0];

      (await query(
        'INSERT INTO staff (staff_id, restaurant_id) VALUES ($1, $2) RETURNING staff_id',
        [user.user_id, restaurantId],
      ));
    });

    response.status(201).send('Staff created');
  } catch (error) {
    console.log(error);
    return response.status(500).send('error occured');
  }
};

const staffLogin = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = (await query(
      `
      SELECT staff_id, restaurant_id FROM Staff
      WHERE EXISTS (
        SELECT 1
        FROM users
        WHERE email = $1 
        AND password = $2 
        AND staff_id = user_id
      )
      `,
      [email, password],
    )).rows[0];
    user.type = 'staff';
    return response.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return response.status(500).send('user cannot be found');
  }
};

const staffDelete = async (request, response) => {
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

const updateStaffPassword = async (req, res) => {
  const { staffId, password } = req.body;

  if (staffId === undefined || password === undefined) {
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
      [staffId, password],
    );

    res.status(200).send('Password updated.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Password update failed.');
  }
};

module.exports = {
  staffCreate,
  staffLogin,
  staffDelete,
  updateStaffPassword,
};
