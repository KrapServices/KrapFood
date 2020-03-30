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

// -----------------------------------------------------------------------------
// Utilty functions
// -----------------------------------------------------------------------------

const getAllRestaurantWithFood = async (restaurants ) =>  {
  let result = [];
  for ( let eachRestaurant of restaurants) {
    const id = eachRestaurant['restaurant_id'];
    const foodQuery = await query(
      'SELECT * FROM FOODS where restaurant_id = $1' , [id]
    );
    if (!(foodQuery == undefined)) {
      const eachRestaurantFood = foodQuery.rows;
      eachRestaurant['foods'] = eachRestaurantFood;
    } else {
      eachRestaurant['foods'] = [];
    }
    result.push(eachRestaurant);
  }
  return result;
}

// -----------------------------------------------------------------------------
// Functions for Staff Dashboard
// -----------------------------------------------------------------------------

/* Calculates total cost of orders */
const getTotalCost = async (request, response) => {
  try {
    const { id } = request.params;
    month = Date.now().getMonth() + 1;
    const totalCost = (await query(
      `SELECT COALESCE(sum(price), 0)
      FROM foods F NATURAL JOIN contain C
      JOIN orders O ON O.order_id = C.order_id 
      AND O.status = 'completed'
      WHERE EXTRACT(month FROM O.modified_at) = $1
      GROUP BY restaurant_id
      HAVING restaurant_id = $2
      `
      ,
    [month, id]
    )).rows[0];
    return response.status(200).json({ restaurant: totalCost });
  } catch (error) {
    console.log(error);
    return response.status(500).send('restaurant could not be found');
  }
};

/* Calculates total number of orders */
const getTotalOrders = async (request, response) => {
  try {
    const { id } = request.params;
    month = Date.now().getMonth() + 1;
    const totalOrders = (await query(
      `SELECT COALESCE(count(distinct O.order_id), 0)
      FROM foods F NATURAL JOIN contain C
      JOIN orders O ON O.order_id = C.order_id 
      AND O.status = 'completed'
      WHERE EXTRACT(month FROM O.modified_at) = $1
      GROUP BY restaurant_id
      HAVING restaurant_id = $2
      `
      ,
    [month, id]
    )).rows[0];
    return response.status(200).json({ restaurant: totalCost });
  } catch (error) {
    console.log(error);
    return response.status(500).send('restaurant could not be found');
  }
};

/* Calculates total number of orders */
const getTopFive = async (request, response) => {
  try {
    const { id } = request.params;
    month = Date.now().getMonth() + 1;
    const topFiveItems = (await query(
      `SELECT food_name, category, price, count(food_id)
      FROM foods F NATURAL JOIN contain C
      JOIN orders O ON O.order_id = C.order_id
      AND O.status = 'completed'
      WHERE EXTRACT(month FROM O.modified_at) = $1
      HAVING restaurant_id = $1
      ORDER BY (
        SELECT count(food_id)
        FROM foods F NATURAL JOIN contain C
        JOIN orders O ON O.order_id = C.order_id
        AND O.status = 'completed'
        HAVING restaurant_id = $2
      )
      LIMIT 5
      `
      ,
      [month, id]
    )).rows;
    return response.status(200).json({ restaurant: totalCost });
  } catch (error) {
    console.log(error);
    return response.status(500).send('restaurant could not be found');
  }
};


module.exports = {
  createRestaurant,
  getAllRestaurant,
  getRestaurantById,
  getTopFive,
  getTotalCost,
  getTotalOrders
};
