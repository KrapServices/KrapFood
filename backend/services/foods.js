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

module.exports = {
  createFood,
};
