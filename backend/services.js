const { query, transact } = require('./database');


// =============================================================================
// =============================================================================
// USERS METHODS
// =============================================================================
// =============================================================================
// CUSTOMERs
// =============================================================================

// create single user for customer
const customerCreate = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await transact(async (query) => {
      const user = (await query(
        "INSERT INTO users (email , password) VALUES ($1,$2) RETURNING user_id",
        [email, password]
      )).rows[0];
      (await query(
        "INSERT INTO customers (customer_id) VALUES ($1) RETURNING customer_id",
        [user["user_id"]]
      ));
      return user;
    });
    response.status(201).send(`user created`);
  } catch (error) {
    console.log(error);
    return response.status(500).send("error occured");
  }
};

const customerLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
      let user = (await query(
        "SELECT customer_id ,card, num_orders FROM customers where exists( select 1 from users u where email = $1 and password = $2 and customer_id = u.user_id)",
        [email, password]
      )).rows[0];
      //append info to user object
      user["type"] = "customer";
      console.log(user);
    return response.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return response.status(500).send("user cannot be found");
  }
};

// =============================================================================
// MANAGERS
// =============================================================================

// create single user for manager
const managerCreate = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await transact(async (query) => {
      const user = (await query(
        "INSERT INTO users (email , password) VALUES ($1,$2) RETURNING user_id",
        [email, password]
      )).rows[0];
      (await query(
        "INSERT INTO managers (manager_id) VALUES ($1) RETURNING manager_id",
        [user["user_id"]]
      ));
      return user;
    });
    response.status(201).send(`user created`);
  } catch (error) {
    console.log(error);
    return response.status(500).send("error occured");
  }
};

const managerLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
  
      let user = (await query(
        "SELECT manager_id FROM managers where exists( select 1 from users u where email = $1 and password = $2 and manager_id = u.user_id)",
        [email, password]
      )).rows[0];
      //append info to user object
      user["type"] = "manager";
      //user = { ...user, ...manager };
      console.log(user);
    return response.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return response.status(500).send("user cannot be found");
  }
};

// =============================================================================
// RIDERS
// =============================================================================

// create single user for rider
const riderCreate = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await transact(async (query) => {
      const user = (await query(
        "INSERT INTO users (email , password) VALUES ($1,$2) RETURNING user_id",
        [email, password]
      )).rows[0];
      (await query(
        "INSERT INTO riders (rider_id) VALUES ($1) RETURNING rider_id",
        [user["user_id"]]
      ));
      return user;
    });
    response.status(201).send(`user created`);
  } catch (error) {
    console.log(error);
    return response.status(500).send("error occured");
  }
};


const riderLogin = async (request, response) => {
  try {
    const { email, password } = request.body;

    const result = await transact(async (query) => { 
      let user = (await query(
        "SELECT user_id, email, password FROM users WHERE email = $1 and password = $2",
        [email, password]
      )).rows[0];
      const rider = (await query(
        "SELECT rider_id FROM riders WHERE rider_id = $1",
        [user["user_id"]]
      )).rows[0];
      //append info to user object
      user["type"] = "rider";
      user = { ...user, ...rider };
      console.log(user);
      return user 
    });
    response.status(200).json({ user: result });
  } catch (error) {
    console.log(error);
    return response.status(500).send("user cannot be found");
  }
};


// =============================================================================
// STAFF
// =============================================================================

// create single user for staff
const staffCreate = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await transact(async (query) => {
      const user = (await query(
        "INSERT INTO users (email , password) VALUES ($1,$2) RETURNING user_id",
        [email, password]
      )).rows[0];
      (await query(
        "INSERT INTO staff (staff_id) VALUES ($1) RETURNING staff_id",
        [user["user_id"]]
      ));
      return user;
    });
    response.status(201).send(`user created`);
  } catch (error) {
    console.log(error);
    return response.status(500).send("error occured");
  }
};


const staffLogin = async (request, response) => {
  try {
    const { email, password } = request.body;

    const result = await transact(async (query) => { 
      let user = (await query(
        "SELECT user_id, email, password FROM users WHERE email = $1 and password = $2",
        [email, password]
      )).rows[0];
      const staff = (await query(
        "SELECT staff_id FROM staff WHERE staff_id = $1",
        [user["user_id"]]
      )).rows[0];
      //append info to user object
      user["type"] = "staff";
      user = { ...user, ...staff };
      console.log(user);
      return user 
    });
    response.status(200).json({ user: result });
  } catch (error) {
    console.log(error);
    return response.status(500).send("user cannot be found");
  }
};

// =============================================================================
// RESTAURANTS
// =============================================================================
// =============================================================================
// Services for Restaurants
// =============================================================================

const createRestaurant = async (request, response) => {
  try {
    const { threshold, restaurant_name, restaurant_location, delivery_fee } = request.body;
    console.log(restaurant_name);
    let result = (await query(
      "INSERT INTO restaurants (threshold, restaurant_name, restaurant_location, delivery_fee) VALUES ($1,$2,$3,$4) RETURNING restaurant_id",
      [threshold, restaurant_name, restaurant_location, delivery_fee]
    )).rows[0];
    console.log(result);
    return response.status(200).json({ created_restaurant_id: result });
  } catch (error) {
    console.log(error);
    return response.status(500).send("An error occured with creating the restaurants. please try again");
  }
};

const getAllRestaurant = async (request, response) => {
  try {
    let restaurants = (await query(
      "SELECT restaurant_id, restaurant_name, restaurant_location from restaurants",
    )).rows;
    console.log(`restaurants: ${restaurants}`);
    return response.status(200).json({ restaurants });
  } catch (error) {
    console.log(error);
    return response.status(500).send("An error occured with getting the restaurants");
  }
};

const getRestaurantById = async (request, response) => {
  try {
 
    const { id } = request.params;
  
    let restaurant = (await query(
      "SELECT * FROM restaurants where restaurant_id = $1", [id]
    )).rows[0];
    console.log(`Single restaurant: ${restaurant}`);
    return response.status(200).json({ restaurant: restaurant });
  } catch (error) {
    console.log(error);
    return response.status(500).send("restaurant could not be found");
  }
};

module.exports = {
  customerLogin,
  customerCreate,
  managerLogin,
  managerCreate,
  staffLogin,
  staffCreate,
  riderLogin,
  riderCreate,
  getAllRestaurant,
  getRestaurantById,
  createRestaurant,
};

/**
 * Example crud
 */

 /*
 //get users
const getUsers = async (request, response) => {
  try {
    const result = await query("SELECT * FROM users ORDER BY id ASC");
    response.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
// get a single user
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  query("SELECT * FROM users WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

// create single user
const createUser = (request, response) => {
  // should we store password?
  const { email, password } = request.body;

  query(
    "INSERT INTO users (email , password) VALUES ($1,$2)",
    [email, password],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

// update single user
// /users/:id
const updateUser = (request, response) => {
  // should we store password?
  const { id } = request.params.id;
  const { email, password } = request.body;

  query(
    "UPDATE users SET email = $1, password = $2",
    [email, password],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.send(200).send(`user modified with id: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  query("DELETE FROM users WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

 */