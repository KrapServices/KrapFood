const { query } = require('../database');

// =============================================================================
// RESTAURANTS
// =============================================================================
// =============================================================================
// Services for Restaurants
// =============================================================================

const createRestaurant = async (request, response) => {
  try {
    const {
      threshold, restaurant_name, restaurant_location, delivery_fee,
    } = request.body;
    console.log(restaurant_name);
    const result = (await query(
      'INSERT INTO restaurants (price_threshold, restaurant_name, restaurant_location, delivery_fee) VALUES ($1,$2,$3,$4) RETURNING restaurant_id',
      [threshold, restaurant_name, restaurant_location, delivery_fee],
    )).rows[0];
    console.log(result);
    return response.status(200).json({ created_restaurant_id: result });
  } catch (error) {
    console.log(error);
    return response.status(500).send('An error occured with creating the restaurants. please try again');
  }
};

const getAllRestaurant = async (request, response) => {
  try {
    let restaurants = (await query(
      'SELECT r.restaurant_id, restaurant_name, restaurant_location, price_threshold from restaurants r',
    )).rows;
    restaurants = await getAllRestaurantWithFood(restaurants);
    console.log(`restaurants: ${restaurants}`);
    return response.status(200).json({ restaurants });
  } catch (error) {
    console.log(error);
    return response.status(500).send('An error occured with getting the restaurants');
  }
};

const getRestaurantById = async (request, response) => {
  try {
    const { id } = request.params;
    const restaurant = (await query(
      'SELECT * FROM restaurants where restaurant_id = $1', [id],
    )).rows[0];
    const food = (await query(
      'SELECT food_id, category, food_name, daily_limit, availability, price, price_threshold FROM foods f NATURAL JOIN restaurants where f.restaurant_id = $1', [id],
    )).rows;
    const restaurantWithFood = { ...restaurant, food };
    console.log(`Single restaurant: ${restaurant}`);
    return response.status(200).json({ restaurant: restaurantWithFood });
  } catch (error) {
    console.log(error);
    return response.status(500).send('restaurant could not be found');
  }
};

const getMenuById = async (request, response) => {
  try {
    const { id } = request.params;
    const food = (await query(
      `SELECT food_id, category, food_name, daily_limit, availability, price 
        FROM foods F
        WHERE F.restaurant_id = $1`,
      [id],
    )).rows;
    console.log(food);
    // const menu = food;
    return response.status(200).json(food);
  } catch (error) {
    console.log(error);
    return response.status(500).send('menu could not be found');
  }
};


// -----------------------------------------------------------------------------
// Utilty functions
// -----------------------------------------------------------------------------

const getAllRestaurantWithFood = async (restaurants) => {
  const result = [];
  for (const eachRestaurant of restaurants) {
    const id = eachRestaurant.restaurant_id;
    const foodQuery = await query(
      'SELECT * FROM FOODS where restaurant_id = $1', [id],
    );
    if (!(foodQuery == undefined)) {
      const eachRestaurantFood = foodQuery.rows;
      eachRestaurant.foods = eachRestaurantFood;
    } else {
      eachRestaurant.foods = [];
    }
    result.push(eachRestaurant);
  }
  return result;
};

// -----------------------------------------------------------------------------
// Functions for Staff Dashboard
// -----------------------------------------------------------------------------
const getMonthsById = async (request, response) => {
  try {
    const { id: restaurantId } = request.params;
    const yearMonths = (await query(
      `
      SELECT DISTINCT EXTRACT(YEAR FROM O.modified_at) AS year, EXTRACT(MONTH FROM O.modified_at) AS month
      FROM foods F JOIN contain C 
      ON F.food_id = C.food_id AND F.restaurant_id = $1
      JOIN orders O ON O.order_id = C.order_id 
      AND O.status = 'completed'
      `,
      [restaurantId],
    )).rows;
    return response.status(200).json(yearMonths);
  } catch (error) {
    console.log(error);
    return response.status(500).send('restaurant could not be found');
  }
};

const getStatsById = async (request, response) => {
  try {
    const { id: restaurantId } = request.params;
    const { month, year } = request.query;
    const stats = (await query(
      `
      SELECT count(distinct O.order_id) AS order_count, COALESCE(sum(price), 0) AS total_cost
      FROM foods F JOIN contain C
      ON F.food_id = C.food_id AND F.restaurant_id = $1
      JOIN orders O ON O.order_id = C.order_id
      AND O.status = 'completed'
      AND EXTRACT(MONTH FROM O.modified_at) = $2 AND EXTRACT(YEAR FROM O.modified_at) = $3
      `,
      [restaurantId, month, year],
    )).rows.map((stat) => ({
      month: stat.month,
      orderCount: stat.order_count,
      totalCost: stat.total_cost,
    }));
    return response.status(200).json({
      stats,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send('restaurant could not be found');
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurant,
  getRestaurantById,
  getMenuById,
  getMonthsById,
  getStatsById,
};
