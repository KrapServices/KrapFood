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
    const restaurants = (await query(
      'SELECT r.restaurant_id, restaurant_name, restaurant_location from restaurants r',
    )).rows;
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
      'SELECT * FROM foods where restaurant_id = $1', [id],
    )).rows;
    const restaurantWithFood = { ...restaurant, food };
    console.log(`Single restaurant: ${restaurant}`);
    return response.status(200).json({ restaurant: restaurantWithFood });
  } catch (error) {
    console.log(error);
    return response.status(500).send('restaurant could not be found');
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurant,
  getRestaurantById,
};
