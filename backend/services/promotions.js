const { query } = require('../database');

const createPromotion = async (request, response) => {
  try {
    const {
      restaurantId, promoId, discount, promoName, startTime, endTime,
    } = request.body;
    const promo = (await query(
      `
        INSERT INTO promotions (promo_id, discount,  promo_name, start_time, end_time) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING promo_id, promo_name
        `,
      [promoId, discount, promoName, startTime, endTime],
    )).rows[0];
    const restaurant = (await query(
      `
        INSERT INTO offers (promo_id, restaurant_id)
        VALUES ($1, $2)
        RETURNING restaurant_id
    `,
      [promo.promo_id, restaurantId],
    )).rows[0];
    response.status(200).json({
      promo: {
        restaurantId: restaurant.restaurant_id,
        promoId: promo.promo_id,
        promoCode: promo.promo_code,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send('An error occured with creating the promotion');
  }
};

module.exports = {
  createPromotion,
};
