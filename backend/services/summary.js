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

const getAllOrderMonths = async (request, response) => {
  try {
    const months = (await query(
      `SELECT DISTINCT EXTRACT(YEAR FROM O.created_at) AS year, EXTRACT(MONTH FROM O.created_at) AS month
      FROM Delivers D JOIN Orders O ON D.order_id = O.order_id
      AND O.status = 'completed'
      `,
    )).rows;
    response.status(200).json(months);
  } catch (error) {
    console.log(error);
    response.status(500).send('no completed orders found');
  }
};

const getRiderStatsByMonth = async (request, response) => {
  try {
    const { month, year } = request.query;
    const stats = (await query(
      `
    WITH rider_commission AS (
      SELECT rider_id, sum(O.delivery_fee) AS commission
      FROM Delivers D JOIN Orders O ON D.order_id = O.order_id AND O.status = 'completed'
      WHERE EXTRACT(MONTH FROM O.created_at) = $1 AND EXTRACT(YEAR FROM O.created_at) = $2
      GROUP BY rider_id
      ),
      rider_hours AS (
        SELECT rider_id,
        CASE
          WHEN R.rider_id in (SELECT rider_id FROM part_time_riders PT) THEN
            (SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
            FROM PT_rider_works P JOIN (WWS_Contains C JOIN Shifts S ON C.shift_id = S.shift_id) ON C.wws_id = P.wws_id
            WHERE EXTRACT(MONTH FROM S.work_date) = $1 AND EXTRACT(YEAR FROM S.work_date) = $2 AND P.rider_id = R.rider_id
            GROUP BY rider_id)
          WHEN R.rider_id in (SELECT rider_id FROM full_time_riders FT) THEN
            (SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
            FROM FT_rider_works F JOIN (MWS_Contains C JOIN Shifts S ON C.shift_id = S.shift_id) ON C.mws_id = F.mws_id
            WHERE EXTRACT(MONTH FROM S.work_date) = $1 AND EXTRACT(YEAR FROM S.work_date) = $2 AND F.rider_id = R.rider_id
            GROUP BY rider_id)
          ELSE 0
        END AS hours
      FROM riders R
      ),
      rider_pay AS (
      SELECT rider_id,
        CASE
          WHEN R.rider_id in (SELECT rider_id FROM part_time_riders PT) THEN
            (SELECT salary_per_hour * COALESCE(hours, 0)
            FROM part_time_riders PT LEFT JOIN rider_hours H ON PT.rider_id = H.rider_id
            WHERE H.rider_id = R.rider_id)
          WHEN R.rider_id in (SELECT rider_id FROM full_time_riders FT) THEN
            (SELECT base_salary 
            FROM full_time_riders FT
            WHERE FT.rider_id = R.rider_id)
        END AS pay
      FROM riders R),
      rider_stats AS (
        SELECT rider_id, count(DISTINCT delivery_id) AS order_count, EXTRACT (EPOCH FROM avg(completion_time-departure_time)) AS delivery_time, count(rating) as no_rating, avg(rating) as avg_rating
        FROM Delivers D JOIN Orders O ON D.order_id = O.order_id
        WHERE EXTRACT(MONTH FROM O.created_at) = $1 AND EXTRACT(YEAR FROM O.created_at) = $2 AND O.status = 'completed'
        GROUP BY rider_id
      )
      SELECT P.rider_id, COALESCE(commission, 0) + COALESCE(pay, 0) AS total_pay, COALESCE(hours, 0) AS hours_worked, COALESCE(order_count, 0) AS order_count, delivery_time, no_rating, avg_rating
      FROM rider_hours H JOIN (rider_pay P LEFT JOIN (rider_commission C JOIN rider_stats S ON C.rider_id = S.rider_id) ON C.rider_id = P.rider_id) ON P.rider_id = H.rider_id
      ORDER BY P.rider_id;      
    `,
      [month, year],
    )).rows.map((rider) => ({
      riderId: rider.rider_id,
      orderCount: rider.order_count,
      pay: rider.total_pay,
      hours: rider.hours_worked,
      deliveryTime: rider.delivery_time,
      noRating: rider.no_rating,
      avgRating: rider.avg_rating,
    }));
    response.status(200).json({ stats });
  } catch (error) {
    console.log(error);
    response.status(500).send('rider stats for the month could not be retrieved');
  }
};


module.exports = {
  getCustomerStatistics,
  getDeliveryLocations,
  getOrderCountByLocation,
  getAllOrderMonths,
  getRiderStatsByMonth,
};
