const { query, transact } = require('../database');

// -----------------------------------------------------------------------------
// Orders 
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Services for Orders
// -----------------------------------------------------------------------------
const createOrder = async (request, response) => {
  try {
   // const { threshold, restaurant_name, restaurant_location, delivery_fee } = request.body;
   // console.log(restaurant_name);
    let result = (await query(
      "INSERT INTO orders (total_cost, price, status, delivery_fee) VALUES ($1,$2,$3,$4) RETURNING order_id",
      [threshold, restaurant_name, restaurant_location, delivery_fee]
    )).rows[0];
    //console.log(result);
    return response.status(200).json({ created_order_id: result });
  } catch (error) {
    console.log(error);
    return response.status(500).send("An error occured with creating the order. please try again");
  }
};

const getAllOrders = async (request, response) => {
  try {
    let restaurants = (await query(
     // "SELECT restaurant_id, restaurant_name, restaurant_location from restaurants",
    )).rows;
    console.log(`restaurants: ${restaurants}`);
    return response.status(200).json({ restaurants });
  } catch (error) {
    console.log(error);
    return response.status(500).send("An error occured with getting the restaurants");
  }
};

const getOrderById = async (request, response) => {
  try {
 
    const { id } = request.params;
  
    let restaurant = (await query(
     // "SELECT * FROM restaurants where restaurant_id = $1", [id]
    )).rows[0];
    console.log(`Single restaurant: ${restaurant}`);
    return response.status(200).json({ restaurant: restaurant });
  } catch (error) {
    console.log(error);
    return response.status(500).send("restaurant could not be found");
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