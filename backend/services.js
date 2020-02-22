const { query, transact } = require('./database');

query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connection successful");
  }
});

////////////////////////////////////////////////////////////////

/**
 * QUERIES THAT DEAL WITH USERS
 */

const exampleTransaction = async () => {
  const result = await transact(async (query) => {
    const time = (await query('SELECT NOW()')).rows[0];
    console.log(`Time: ${JSON.stringify(time)}`);
    const t = await query('SELECT 1');
    return t;
  });
  console.log(result.rows[0]);
}

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
        "INSERT INTO customers (customer_id,card,num_orders) VALUES ($1,$2,$3) RETURNING customer_id",
        [user["user_id"], null, 0]
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

    const result = await transact(async (query) => { 
      let user = (await query(
        "SELECT user_id, email, password FROM users WHERE email = $1 and password = $2",
        [email, password]
      )).rows[0];
      const customer = (await query(
        "SELECT customer_id, card, num_orders FROM customers WHERE customer_id = $1",
        [user["user_id"]]
      )).rows[0];
      //append info to user object
      user["type"] = "customer";
      user = { ...user, ...customer };
      console.log(user);
      return user 
    });
    response.status(200).json({ user: result });
  } catch (error) {
    console.log(error);
    return response.status(500).send("user cannot be found");
  }
};




module.exports = {
  customerLogin,
  customerCreate,
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