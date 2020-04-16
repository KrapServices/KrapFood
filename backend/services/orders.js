const { query, transact } = require('../database');

// -----------------------------------------------------------------------------
// Orders
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Services for Orders
// -----------------------------------------------------------------------------
const createOrder = async (request, response) => {
  try {
    await transact(async (query) => {
      const {
        totalCost, status, listOfFoods, deliveryLocation,
        customerId, deliveryFee,
        restaurantPromotions, customerPromotionsApplied,
        payByCash, selectedCreditCard, pointsToRedeem,
      } = request.body;

      const order = (await query(
        `
        INSERT INTO orders (customer_id, delivery_location, total_cost, status, delivery_fee) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING order_id
      `,
        [customerId, deliveryLocation, totalCost, status, deliveryFee],
      )).rows[0];
      await Promise.all(restaurantPromotions.map((promotion) => query(
        `
          INSERT INTO applies (promo_id, order_id) VALUES ($1,$2)
        `,
        [promotion.promoId, order.order_id],
      )));
      await Promise.all(customerPromotionsApplied.map((promotion) => query(
        `
          INSERT INTO applies (promo_id, order_id) VALUES ($1,$2)
        `,
        [promotion.promoId, order.order_id],
      )));

      if (payByCash) {
        await query(
          `
        INSERT INTO cash_payments (order_id, cash) VALUES ($1, true)
        `,
          [order.order_id],
        );
      } else {
        await query(
          `
        INSERT INTO card_payments (order_id, card_number) VALUES ($1, $2)
        `,
          [order.order_id, selectedCreditCard.card_number],
        );
      }


      await Promise.all(listOfFoods.map((food) => {
        const { order_id: orderId } = order;
        const { restaurantId, foodName, quantity } = food;

        return query(
          `
          INSERT INTO contain (order_id, restaurant_id, food_name, quantity)
          VALUES ($1, $2, $3, $4)
        `,
          [orderId, restaurantId, foodName, quantity],
        );
      }));

      await query(
        `
      UPDATE CUSTOMERS SET points = points - $1 
      WHERE CUSTOMER_ID = $2;
      `,
        [pointsToRedeem, customerId],
      );

      response.status(200).json({ order });
    });
  } catch (error) {
    console.log(error);
    response.status(500).send('An error occurred when creating the order. Please try again.');
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

const getFoodInOrderById = async (request, response) => {
  try {
    const { id } = request.params;
    const food = (await query(
      'SELECT restaurant_id, food_name FROM contain where order_id = $1', [id],
    )).rows;
    return response.status(200).json({ food });
  } catch (error) {
    console.log(error);
    return response.status(500).send('food could not be found');
  }
};

const getOrderByUserId = async (request, response) => {
  try {
    const { id } = request.params;

    const orders = (await query(
      'SELECT  order_id, total_cost, status, delivery_location, customer_id, rating FROM orders where customer_id = $1 order by order_id', [id],
    )).rows;
    console.log(`orders: ${orders}`);
    const preparingOrders = orders.filter((x) => x.status === 'preparing');
    const deliveringOrders = orders.filter((x) => x.status === 'delivering');
    const completedOrders = orders.filter((x) => x.status === 'completed');

    return response.status(200).json({
      orders, preparingOrders, deliveringOrders, completedOrders,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send('orders could not be found');
  }
};

const getOrderByRiderId = async (request, response) => {
  try {
    const { id } = request.params;
    const orders = (await query(
      'SELECT * FROM orders natural join Delivers where rider_id = $1 and (status = $2 or status = $3)', [id, 'delivering', 'completed'],
    )).rows;
    console.log(`orders: ${orders}`);
    // const preparingOrders = orders.filter(x => x.status === 'preparing');
    const departToCollectOrders = orders.filter((x) => x.status === 'delivering' && x.departure_time === null && x.arrival_time === null && x.collection_time === null);
    const arriveToCollectOrders = orders.filter((x) => x.status === 'delivering' && x.departure_time !== null && x.arrival_time === null && x.collection_time === null);
    const departFromRestaurantOrders = orders.filter((x) => x.status === 'delivering' && x.departure_time !== null && x.arrival_time !== null && x.collection_time === null);
    const deliveringOrders = orders.filter((x) => x.status === 'delivering' && x.departure_time !== null && x.arrival_time !== null && x.collection_time !== null);
    const completedOrders = orders.filter((x) => x.status === 'completed');
    return response.status(200).json({
      orders, deliveringOrders, completedOrders, departToCollectOrders, departFromRestaurantOrders, arriveToCollectOrders,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send('orders could not be found');
  }
};

const getOrderByRestaurantId = async (request, response) => {
  try {
    const { id } = request.params;
    const orders = (await query(
      'SELECT  order_id, total_cost, status, delivery_location, customer_id FROM orders o natural join contain where restaurant_id = $1 group by restaurant_id , order_id', [id],
    )).rows;
    console.log(`orders: ${orders}`);
    const preparingOrders = orders.filter((x) => x.status === 'preparing');
    const deliveringOrders = orders.filter((x) => x.status === 'delivering');
    const completedOrders = orders.filter((x) => x.status === 'completed');
    return response.status(200).json({
      orders, preparingOrders, deliveringOrders, completedOrders,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send('orders could not be found');
  }
};

const updateOrderStatus = async (request, response) => {
  try {
    const { id } = request.params;
    const { status } = request.body;
    (await query(
      ' UPDATE ORDERS set status = $1, modified_at = DEFAULT where order_id = $2;', [status, id],
    ));
    return response.status(200).send();
  } catch (error) {
    console.log(error);
    return response.status(500).send('orders could not be updated to delivering');
  }
};

const updateOrderTimingDepartureToRestaurant = async (request, response) => {
  try {
    const { id } = request.params;
    (await query(
      ' UPDATE DELIVERS set departure_time = NOW()::TIME where order_id = $1;', [id],
    ));
    return response.status(200).send();
  } catch (error) {
    console.log(error);
    return response.status(500).send('orders could not be updated');
  }
};

const updateOrderTimingArrival = async (request, response) => {
  try {
    const { id } = request.params;
    (await query(
      ' UPDATE DELIVERS set arrival_time = NOW()::TIME where order_id = $1;', [id],
    ));
    return response.status(200).send();
  } catch (error) {
    console.log(error);
    return response.status(500).send('orders could not be updated');
  }
};

const updateOrderTimingDepartureFromRestaurant = async (request, response) => {
  try {
    const { id } = request.params;
    (await query(
      ' UPDATE DELIVERS set collection_time = NOW()::TIME where order_id = $1;', [id],
    ));
    return response.status(200).send();
  } catch (error) {
    console.log(error);
    return response.status(500).send('orders could not be updated');
  }
};


module.exports = {
  getAllOrders,
  getOrderById,
  getFoodInOrderById,
  getOrderByUserId,
  getOrderByRiderId,
  updateOrderStatus,
  createOrder,
  getOrderByRestaurantId,
  updateOrderTimingDepartureToRestaurant,
  updateOrderTimingArrival,
  updateOrderTimingDepartureFromRestaurant,
};
