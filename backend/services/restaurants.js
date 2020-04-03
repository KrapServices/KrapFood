const { query } = require('../database');

// =============================================================================
// RESTAURANTS
// =============================================================================

// -----------------------------------------------------------------------------
// Utilty functions
// -----------------------------------------------------------------------------

const getRestaurantWithFood = async (restaurant) => {
  const foods = (await query(
    `
      SELECT restaurant_id, category, food_name, daily_limit, availability, price
      FROM foods 
      WHERE restaurant_id = $1
    `,
    [restaurant.restaurantId],
  )).rows.map((food) => ({
    restaurantId: food.restaurant_id,
    category: food.category,
    foodName: food.food_name,
    dailyLimit: food.daily_limit,
    availability: food.availability,
    price: food.price,
  }));

  return {
    ...restaurant,
    foods,
  };
};

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
    const restaurants = (await query(
      `
        SELECT restaurant_id, restaurant_name, restaurant_location, price_threshold 
        FROM restaurants
      `,
    )).rows.map((restaurant) => ({
      restaurantId: restaurant.restaurant_id,
      restaurantName: restaurant.restaurant_name,
      restaurantLocation: restaurant.restaurant_location,
      priceThreshold: restaurant.price_threshold,
    }));
    const restaurantsWithFood = await Promise.all(restaurants.map(
      (restaurant) => getRestaurantWithFood(restaurant),
    ));
    response.status(200).json({ restaurants: restaurantsWithFood });
  } catch (error) {
    console.log(error);
    response.status(500).send('An error occurred when retrieving restaurants.');
  }
};

const getRestaurantById = async (request, response) => {
  try {
    const { id } = request.params;
    const restaurant = (await query(
      `
        SELECT restaurant_id, restaurant_name, restaurant_location, price_threshold 
        FROM restaurants
        WHERE restaurant_id = $1
      `,
      [id],
    )).rows[0];
    const restaurantWithFood = await getRestaurantWithFood({
      restaurantId: restaurant.restaurant_id,
      restaurantName: restaurant.restaurant_name,
      restaurantLocation: restaurant.restaurant_location,
      priceThreshold: restaurant.price_threshold,
    });
    response.status(200).json({ restaurant: restaurantWithFood });
  } catch (error) {
    console.log(error);
    response.status(500).send('Restaurant could not be found.');
  }
};

const getMenuById = async (request, response) => {
  try {
    const { id } = request.params;
    const foods = (await query(
      `
        SELECT category, food_name, daily_limit, availability, price 
        FROM foods
        WHERE restaurant_id = $1
      `,
      [id],
    )).rows.map((food) => ({
      category: food.category,
      foodName: food.food_name,
      dailyLimit: food.daily_limit,
      availability: food.availability,
      price: food.price,
    }));
    return response.status(200).json(foods);
  } catch (error) {
    console.log(error);
    return response.status(500).send('menu could not be found');
  }
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
        ON F.restaurant_id = C.restaurant_id 
        AND f.food_name = C.food_name 
        AND F.restaurant_id = $1
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
      ON F.restaurant_id = C.restaurant_id 
      AND f.food_name = C.food_name 
      AND F.restaurant_id = $1
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
    const topFive = (await query(
      `
    WITH foodCount AS (
      SELECT C.food_name, C.restaurant_id, count(*) AS orderCount
      FROM foods F JOIN contain C
      ON F.food_name = C.food_name AND F.restaurant_id = C.restaurant_id AND F.restaurant_id = $1
      JOIN orders O ON O.order_id = C.order_id
      AND O.status = 'completed'
    AND EXTRACT(MONTH FROM O.modified_at) = $2 AND EXTRACT(YEAR FROM O.modified_at) = $3
      GROUP BY (C.food_name, C.restaurant_id)
      )
      SELECT C.food_name, category, price, orderCount
      FROM foodCount C JOIN foods F ON C.food_name = F.food_name AND C.restaurant_id = F.restaurant_id
      ORDER BY orderCount desc
      LIMIT 5
        `,
      [restaurantId, month, year],
    )).rows;
    return response.status(200).json({
      stats,
      topFive,
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
