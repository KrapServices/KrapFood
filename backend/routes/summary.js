const express = require('express');
const { query } = require('../database');

const router = express.Router();

router.get('/', async (req, res) => {
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
        SELECT count(order_id) AS order_count, sum(total_cost) AS total_cost
        FROM orders
        WHERE created_at - $1 >= '0' AND $2 - created_at >= '0'
      `,
      [new Date(parseInt(startDate, 10)), new Date(parseInt(endDate, 10))],
    )).rows[0];

    res.status(200).json({
      startDate: new Date(parseInt(startDate, 10)).toString(),
      endDate: new Date(parseInt(endDate, 10)).toString(),
      summary: {
        customerCount: parseInt(customerCount, 10),
        orderCount: parseInt(orderCount, 10),
        totalCost: parseFloat(totalCost),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

module.exports = router;
