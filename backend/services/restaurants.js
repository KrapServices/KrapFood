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

module.exports = {
  createRestaurant,
  getAllRestaurant,
  getRestaurantById,
};
