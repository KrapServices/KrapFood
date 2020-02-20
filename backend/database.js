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
  // should we store password?

  try {
    const { email, password } = request.body;
    const result = await pool.query(
      "INSERT INTO users (email , password) VALUES ($1,$2) RETURNING user_id",
      [email, password]
    );
    console.log(result);
    const resultCx = await pool.query(
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
    console.log(request.body);
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 and password = $2 ",
      [email, password]
    );

    console.table(result.rows);
    result.rows[0]["type"] = "customer";
    console.log(result.rows[0]);
    response.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.log(error);
    return response.status(500).send("user cannot be found");
  }
};

const login = async (request, response) => {
  try {
    const { email, password, type } = request.body;
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 and password = $2 ",
      [email, password]
    );
    console.table(result.rows);
    if (type === "customer") {
      result.rows[0]["type"] = "customer";
    }
    console.log(result.rows[0]);
    response.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.log(error);
    return response.status(500).send("user cannot be found");
  }
};

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
  login,
  getUsers,
  getUserById,
  customerLogin,
  createCustomerUser,
  updateUser,
  deleteUser
};
