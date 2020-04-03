const { query } = require('../database');

const createFood = async (request, response) => {
  try {
    console.log(request.body);
    const {
      category, foodName, dailyLimit, availability, price, restaurantId,
    } = request.body;
    const food = (await query(
      `
        INSERT INTO foods (category, food_name,  daily_limit, availability, price, restaurant_id) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING restaurant_id, food_name
      `,
      [category, foodName, dailyLimit, availability, price, restaurantId],
    )).rows[0];
    response.status(200).json({
      food: {
        restaurantId: food.restaurant_id,
        foodName: food.food_name,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send('An error occured with adding the food. please try again');
  }
};

const updateItem = async (request, response) => {
  try {
    const {
      category, foodName, dailyLimit, availability, price, restaurantId,
    } = request.body;
    const food = (await query(
      `
        UPDATE foods
        SET category = $1, daily_limit = $2, availability = $3, price = $4, modified_at = DEFAULT
        WHERE restaurant_id = $5 AND food_name = $6
      `,
      [category, dailyLimit, availability, price, restaurantId, foodName],
    )).rows[0];
    return response.status(200).json({ food });
  } catch (error) {
    console.log(error);
    return response.status(500).send("An error occurred with updating the food's availibility. Please try again.");
  }
};

module.exports = {
  createFood,
  updateItem,
};
