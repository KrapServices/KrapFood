/* eslint-disable no-shadow */
const { query, transact } = require('../../database');

// =============================================================================
// CUSTOMERs
// =============================================================================

// create single user for customer
const customerCreate = async (request, response) => {
  try {
    const { email, password } = request.body;
    await transact(async (query) => {
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
      FROM promotions p Left Outer join Offers o on p.promo_id = o.promo_id 
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
};
