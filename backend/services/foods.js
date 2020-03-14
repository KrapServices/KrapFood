const { query, transact } = require('../database');

const createFood = async (request, response) => {
    try {
      const { category, food_name,  daily_limit, availability, price, restaurant_id} = request.body;
      console.log(request.body);
      //console.log(restaurant_name);
      const food = (await query(
        "INSERT INTO foods (category, food_name,  daily_limit, availability, price, restaurant_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING food_id",
        [category, food_name,  daily_limit, availability, price, restaurant_id]
      )).rows[0];
      console.log(food);
      return response.status(200).json({ created_food_id: food['food_id'] });
    } catch (error) {
      console.log(error);
      return response.status(500).send("An error occured with adding the food. please try again");
    }
  }

module.exports = {
    createFood
}