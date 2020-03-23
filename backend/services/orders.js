/* eslint-disable camelcase */
const { query } = require('../database');

// -----------------------------------------------------------------------------
// Orders
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Services for Orders
// -----------------------------------------------------------------------------
const createOrder = async (request, response) => {
  try {
    const {
      total_cost, status, listOfFoods, delivery_location, customer_id,
    } = request.body;
    // console.log(restaurant_name);
    const result = (await query(
      'INSERT INTO orders (customer_id, delivery_location, total_cost, status) VALUES ($1,$2, $3,$4) RETURNING order_id',
      [customer_id, delivery_location, total_cost, status],
    )).rows[0];
    console.log(listOfFoods);
    for await (x of listOfFoods) {
      try {
        const { order_id } = result;
        const { food_id, quantity } = x;
        query(
          'INSERT INTO contain (order_id, food_id , quantity) VALUES ($1,$2, $3)',
          [order_id, food_id, quantity],
        );
      } catch (error) {
        console.log(error);
        return response.status(500).send('An error occured with creating the order. please try again');
      }
    }
    return response.status(200).json({ created_order_id: result });
  } catch (error) {
    console.log(error);
    return response.status(500).send('An error occured with creating the order. please try again');
  }
};

const getAllOrders = async (request, response) => {
  try {
    const orders = (await query(
      'SELECT  order_id, total_cost, status FROM orders ',
    )).rows;
    console.log(`orders: ${orders}`);
    return response.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    return response.status(500).send('An error occured with getting the orders');
  }
};

const getOrderById = async (request, response) => {
  try {
    const { id } = request.params;

    const order = (await query(
      'SELECT * FROM orders where order_id = $1', [id],
    )).rows[0];
    console.log(`Single order: ${order}`);
    return response.status(200).json({ order });
  } catch (error) {
    console.log(error);
    return response.status(500).send('order could not be found');
  }
};


module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
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
