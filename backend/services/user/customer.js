/* eslint-disable no-shadow */
const { query, transact } = require('../../database');

// =============================================================================
// CUSTOMERs
// =============================================================================

// create single user for customer
const customerCreate = async (request, response) => {
  try {
    const { email, password, name } = request.body;
    await transact(async (query) => {
      const user = (await query(
        'INSERT INTO users (email , password) VALUES ($1,$2) RETURNING user_id',
        [email, password],
      )).rows[0];
      (await query(
        'INSERT INTO customers (customer_id, name) VALUES ($1, $2) RETURNING customer_id',
        [user.user_id, name],
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
    let user = (await query(
      'SELECT customer_id , order_count, points, name FROM customers where exists( select 1 from users u where email = $1 and password = $2 and customer_id = u.user_id)',
      [email, password],
    )).rows[0];
    // append info to user object
    user = {
      customerId: user.customer_id,
      order_count: user.order_count,
      points: user.points,
      name: user.name,
    };
    user.type = 'customer';
    console.log(user);
    return response.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return response.status(500).send('user cannot be found');
  }
};

const getCustomerById = async (request, response) => {
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
    let month = '';
    let year = '';
    if (expiry.length === 4) {
      month = parseInt(expiry.substring(0, 2), 10);
      // pad 20 in front
      year = parseInt(`20${expiry.substring(2, 4)}`, 10);
    }
    console.log(request.body);
    await query(
      'INSERT INTO CARDS (card_number, expiry_month, expiry_year, customer_id, name_card) VALUES ($1,$2,$3,$4,$5)',
      [cardNumber, month, year, customerId, nameCard],
    );
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

const getCustomerPromotions = async (request, response) => {
  try {
    const promotions = (await query(
      `
      SELECT p.promo_id, p.discount, p.promo_name, p.start_time, p.end_time
      FROM promotions p
      where p.start_time <= current_timestamp
      and p.end_time > current_timestamp
      EXCEPT 
      SELECT p.promo_id, p.discount, p.promo_name, p.start_time, p.end_time 
      FROM promotions p join Offers o on p.promo_id = o.promo_id 
      where p.start_time <= current_timestamp
      and p.end_time > current_timestamp
      `,
    )).rows.map((promo) => ({
      promoId: promo.promo_id,
      discount: promo.discount,
      promoName: promo.promo_name,
      startTime: promo.start_time,
      endTime: promo.end_time,
    }));
    console.log(promotions);
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
      `
      SELECT distinct created_at, order_id, Delivery_location 
      from orders 
      where customer_id = $1 
      and status=$2 
      group by order_id, delivery_location 
      order by created_at DESC 
      limit 5`, [id, 'completed'],
    )).rows;
    return response.status(200).json({ locations });
  } catch (error) {
    console.log(error);
    return response.status(500).send('card cannot be found');
  }
};

const rateOrder = async (request, response) => {
  try {
    const { id, rating } = request.body;
    const ratedOrder = (await query(
      'UPDATE orders set rating = $1 where order_id = $2 returning rating', [rating, id],
    )).rows[0];
    console.log(ratedOrder);
    return response.status(200).json({ ratedOrder });
  } catch (error) {
    console.log(error);
    return response.status(500).send('order cannot be rated');
  }
};

const rateFood = async (request, response) => {
  try {
    const {
      customerId, listOfFood, listOfReview,
    } = request.body;
    listOfFood.forEach(async (value, index) => {
      const { restaurant_id, food_name } = value;
      const review = listOfReview[index];
      if (review !== null) {
        try {
          const ratedFood = (await query(
            'INSERT INTO food_reviews ( restaurant_id, customer_id, food_name, review) VALUES ($1,$2,$3,$4)',
            [restaurant_id, customerId, food_name, review],
          ));
        } catch (error) {
          console.log(error);
        }
      }
    });
    return response.status(200).send();
  } catch (error) {
    console.log(error);
    return response.status(500).send('Seems like you might have already rated some of the food items!');
  }
};

const deleteCustomerById = async (request, response) => {
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

const updateCustomerPassword = async (req, res) => {
  const { customerId, password } = req.body;

  if (customerId === undefined || password === undefined) {
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
      [customerId, password],
    );

    res.status(200).send('Password updated.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Password update failed.');
  }
};

const updateCustomerEmail = async (req, res) => {
  const { customerId, email } = req.body;

  if (customerId === undefined || email === undefined) {
    res.status(400).send('Invalid details');
    return;
  }

  try {
    await query(
      `
        UPDATE users
        SET
          email = $2,
          modified_at = DEFAULT
        WHERE user_id = $1
      `,
      [customerId, email],
    );

    res.status(200).send('Email updated.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Email update failed.');
  }
};

const updateCustomerName = async (req, res) => {
  const { customerId, name } = req.body;

  if (customerId === undefined || name === undefined) {
    res.status(400).send('Invalid details');
    return;
  }

  try {
    await query(
      `
        UPDATE customers
        SET
          name = $2
        WHERE customer_id = $1
      `,
      [customerId, name],
    );
    await query(
      `
        UPDATE users
        SET
          modified_at = DEFAULT
        WHERE user_id = $1
      `,
      [customerId],
    );

    res.status(200).send('Name updated.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Name update failed.');
  }
};

const getUser = async (request, response) => {
  const { id } = request.params;
 console.log(id);
  try {
    await transact(async (query) => {
      let user = (await query(
        'Select customer_id, order_count, points, name from customers where customer_id = $1',
        [id],
      )).rows[0];
      // append info to user object
      user = {
        customerId: user.customer_id,
        order_count: user.order_count,
        points: user.points,
        name: user.name,
      };
      user.type = 'customer';
      console.log(user);
      return response.status(200).json({ user });
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send('error occured');
  }
};


module.exports = {
  customerLogin,
  customerCreate,
  customerCreditCardInfo,
  customerCreateCreditCard,
  getCustomerPromotions,
  getDeliveryLocations,
  getCustomerById,
  rateOrder,
  rateFood,
  deleteCustomerById,
  updateCustomerPassword,
  updateCustomerName,
  updateCustomerEmail,
  getUser,
};
