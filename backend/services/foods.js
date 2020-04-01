const { query } = require('../database');

const createFood = async (request, response) => {
  try {
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
      category, food_name, daily_limit, availability, price, restaurant_id, food_id
    } = request.body;
    console.log(request.body);
    const food = (await query(
      `UPDATE foods
      SET category = $1, food_name = $2, daily_limit = $3, availability = $4, price = $5, modified_at = DEFAULT
      WHERE restaurant_id = $6 AND food_id = $7`,
      [category, food_name, daily_limit, availability, price, restaurant_id, food_id]
    )).rows[0];
    console.log(food);
    return response.status(200).json({ updated_food: food });
  } catch (error) {
    console.log(error);
    return response.status(500).send("An error occured with updating the food's availibility. please try again");
  }
};

module.exports = {
  createFood,
  updateItem
};
