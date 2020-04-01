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
      totalCost, status, listOfFoods, deliveryLocation, customerId,
    } = request.body;

    const order = (await query(
      `
        INSERT INTO orders (customer_id, delivery_location, total_cost, status) 
        VALUES ($1, $2, $3, $4)
        RETURNING order_id
      `,
      [customerId, deliveryLocation, totalCost, status],
    )).rows[0];

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

    response.status(200).json({ order });
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

const getOrderByUserId = async (request, response) => {
  try {
    const { id } = request.params;

    const orders = (await query(
      'SELECT * FROM orders where customer_id = $1', [id],
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

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  createOrder,
};
