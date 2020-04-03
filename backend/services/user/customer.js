const { query, transact } = require('../../database');

// =============================================================================
// CUSTOMERs
// =============================================================================

// create single user for customer
const customerCreate = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await transact(async (query) => {
      const user = (await query(
        'INSERT INTO users (email , password) VALUES ($1,$2) RETURNING user_id',
        [email, password],
      )).rows[0];
      (await query(
        'INSERT INTO customers (customer_id, name) VALUES ($1, $2) RETURNING customer_id',
        [user.user_id, 'john doe'],
      ));
      return user;
    });
    response.status(201).send('user created');
  } catch (error) {
    console.log(error);
    return response.status(500).send('error occured');
  }
};

const customerLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = (await query(
      'SELECT customer_id, order_count, points, name FROM customers where exists( select 1 from users u where email = $1 and password = $2 and customer_id = u.user_id)',
      [email, password],
    )).rows[0];
    // append info to user object
    user.type = 'customer';
    console.log(user);
    return response.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return response.status(500).send('user cannot be found');
  }
};

const getCustomer = async (request, response) => {
  try {
    const { id } = request.params;
    const customer = (await query(
      'SELECT customer_id, order_count, points, name FROM customers where customer_id = $1', [id],
    )).rows[0];
    return response.status(200).json({ customer });
  } catch (error) {
    console.log(error);
    return response.status(500).send('user cannot be found');
  }
};



const customerCreateCreditCard = async (request, response) => {
  try {
    const {
      cardNumber, expiry, customerId, nameCard,
    } = request.body;
    console.log(request.body);
    const result = (await query(
      'INSERT INTO CARDS (card_number, expiry, customer_id, name_card) VALUES ($1,$2,$3,$4)',
      [cardNumber, expiry, customerId, nameCard],
    )).rows[0];
    return response.status(200).send();
  } catch (error) {
    console.log(error);
    return response.status(500).send('card cannot be found');
  }
};


const customerCreditCardInfo = async (request, response) => {
  try {
    const { id } = request.params;
    const cards = (await query(
      'SELECT * FROM cards where customer_id = $1',
      [id],
    )).rows;
    return response.status(200).json({ cards });
  } catch (error) {
    console.log(error);
    return response.status(500).send('card cannot be found');
  }
};

const getPromotions = async (request, response) => {
  try {
    const promotions = (await query(
      'SELECT * FROM promotions',
    )).rows;
    return response.status(200).json({ promotions });
  } catch (error) {
    console.log(error);
    return response.status(500).send('card cannot be found');
  }
};

const getDeliveryLocations = async (request, response) => {
  try {
    const { id } = request.params;
    const locations = (await query(
      'SELECT distinct created_at, order_id, Delivery_location from orders where customer_id = $1 and status=$2 group by order_id, delivery_location order by created_at DESC limit 5', [id, 'completed'],
    )).rows;
    return response.status(200).json({ locations });
  } catch (error) {
    console.log(error);
    return response.status(500).send('card cannot be found');
  }
};

module.exports = {
  customerLogin,
  customerCreate,
  customerCreditCardInfo,
  customerCreateCreditCard,
  getPromotions,
  getDeliveryLocations,
  getCustomer,
};
