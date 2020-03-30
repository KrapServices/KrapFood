const { query } = require('../database');

// TODO: add validator for restaurant id here

const createFood = async (request, response) => {
  try {
    const {
      category, food_name, daily_limit, availability, price, restaurant_id,
    } = request.body;
    console.log(request.body);
    const food = (await query(
      'INSERT INTO foods (category, food_name,  daily_limit, availability, price, restaurant_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING food_id',
      [category, food_name, daily_limit, availability, price, restaurant_id],
    )).rows[0];
    console.log(food);
    return response.status(200).json({ created_food_id: food.food_id });
  } catch (error) {
    console.log(error);
    return response.status(500).send('An error occured with adding the food. please try again');
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
      SET category = $1, food_name = $2, daily_limit = $3, availability = $4, price = $5
      WHERE restaurant_id = $6 AND food_id = $7 returning availability`,
      [category, food_name, daily_limit, availability, price, restaurant_id, food_id]
    )).rows[0];
    console.log(food);
    return response.status(200).json({ updated_food: food_id });
  } catch (error) {
    console.log(error);
    return response.status(500).send("An error occured with updating the food's availibility. please try again");
  }
};

const getMenu = async (request, response) => {
  try {
    const { id } = request.params;
    const food = (await query(
      `SELECT food_id, category, food_name, daily_limit, availability, price 
        FROM foods F
        WHERE F.restaurant_id = $1`, 
    [id],
    )).rows;
    console.log(food.rows);
    // const menu = food;
    return response.status(200).json(food);
  } catch (error) {
    console.log(error);
    return response.status(500).send('menu could not be found');
  }
}

module.exports = {
  createFood,
  getMenu,
  updateItem
};


/*
example request body to create food:
{key : value }
category:fast food
food_name:chicken burger
daily_limit:200
availability:true
price:2.00
restaurant_id:1
*/