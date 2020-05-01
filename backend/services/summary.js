const { query } = require('../database');

const getCustomerStatistics = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const { customer_count: customerCount } = (await query(
      `
          SELECT count(customer_id) AS customer_count
          FROM customers JOIN users ON customer_id = user_id
          WHERE created_at - $1 >= '0' AND $2 - created_at >= '0'
        `,
      [new Date(parseInt(startDate, 10)), new Date(parseInt(endDate, 10))],
    )).rows[0];

    const { order_count: orderCount, total_cost: totalCost } = (await query(
      `
          SELECT count(order_id) AS order_count, COALESCE(sum(total_cost), 0) AS total_cost
          FROM orders
          WHERE created_at - $1 >= '0' AND $2 - created_at >= '0'
        `,
      [new Date(parseInt(startDate, 10)), new Date(parseInt(endDate, 10))],
    )).rows[0];

    const customerStatistics = (await query(
      `
          SELECT customer_id, count(order_id) as order_amount, sum(total_cost) as total_amount
          FROM orders
          WHERE created_at - $1 >= '0' AND $2 - created_at >= '0'
          GROUP BY customer_id
        `,
      [new Date(parseInt(startDate, 10)), new Date(parseInt(endDate, 10))],
    )).rows.map((stat) => ({
      customerId: stat.customer_id,
      orderAmount: stat.order_amount,
      totalAmount: stat.total_amount,
    }));

    res.status(200).json({
      startDate: new Date(parseInt(startDate, 10)).toString(),
      endDate: new Date(parseInt(endDate, 10)).toString(),
      summary: {
        customerCount: parseInt(customerCount, 10),
        orderCount: parseInt(orderCount, 10),
        totalCost: parseFloat(totalCost),
        customerStatistics,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
};

const getDeliveryLocations = async (request, response) => {
  try {
    const area = (await query(
      `
    SELECT DISTINCT delivery_location
    FROM Orders O
    ORDER BY delivery_location;
    `,
    )).rows.map((location) => ({
      deliveryLocation: location.delivery_location,
    }));
    response.status(200).json(area);
  } catch (error) {
    console.log(error);
    response.status(500).send('Unable to retrieve delivery locations');
  }
};

const getOrderCountByLocation = async (request, response) => {
  try {
    const { area } = request.query;
    const decodedLocation = area.replace(/%20/g, ' ');
    const orders = (await query(
      `
        SELECT EXTRACT(hour FROM collection_time) AS hour, count(distinct D.order_id) AS order_count
        FROM Orders O JOIN Delivers D ON O.order_id = D.order_id
        WHERE O.delivery_location = $1
        GROUP BY EXTRACT(hour FROM collection_time);
        `,
      [decodedLocation],
    )).rows.map((order) => ({
      hour: order.hour,
      orderCount: order.order_count,
    }));
    response.status(200).json(orders);
  } catch (error) {
    response.status(500).send('Unable to retrieve order count');
  }
};

module.exports = {
  getCustomerStatistics,
  getDeliveryLocations,
  getOrderCountByLocation,
};
