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
