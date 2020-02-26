const { query, transact } = require('./database');

/**
 * QUERIES THAT DEAL WITH USERS
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CUSTOMER

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MANAGER

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



module.exports = {
  customerLogin,
  customerCreate,
  managerLogin,
  managerCreate
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