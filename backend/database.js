require("dotenv").config();
const { Pool } = require("pg");

// Documentation for pg: https://node-postgres.com/
//load environment variables
const config = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
};

const pool = new Pool(config);

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connection successful");
  }
  //pool.end();
});

////////////////////////////////////////////////////////////////

/**
 * QUERIES THAT DEAL WITH USERS
 */

//get users
const getUsers = async (request, response) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    response.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
// get a single user
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

// create single user for customer
const createCustomerUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await pool.query(
      "INSERT INTO users (email , password) VALUES ($1,$2) RETURNING user_id",
      [email, password]
    );
    await pool.query(
      "INSERT INTO customers (customer_id,card,num_orders) VALUES ($1,$2,$3) RETURNING customer_id",
      [result.rows[0]["user_id"], null, 0]
    );
    response.status(201).send(`user created`);
  } catch (error) {
    console.log(error);
    return response.status(500).send("error occured");
  }
};

const customerLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await pool.query(
      "SELECT user_id, email, password FROM users WHERE email = $1 and password = $2",
      [email, password]
    );
    const customerResult = await pool.query(
      "SELECT customer_id, card, num_orders FROM customers WHERE customer_id = $1",
      [result.rows[0]["user_id"]]
    );
    //append info to user object
    result.rows[0]["type"] = "customer";
    let user = result.rows[0];
    user = { ...user, customer: customerResult.rows[0] };
    response.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return response.status(500).send("user cannot be found");
  }
};

/**
 *  Generic login function
 */

/*
const login = async (request, response) => {
  try {
    const { email, password, type } = request.body;
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 and password = $2 ",
      [email, password]
    );
    response.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.log(error);
    return response.status(500).send("user cannot be found");
  }
};*/

// update single user
// /users/:id
const updateUser = (request, response) => {
  // should we store password?
  const { id } = request.params.id;
  const { email, password } = request.body;

  pool.query(
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

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  getUsers,
  getUserById,
  customerLogin,
  createCustomerUser,
  updateUser,
  deleteUser
};
