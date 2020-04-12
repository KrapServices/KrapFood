const { query } = require('../database');

const createPromotion = async (request, response) => {
  try {
    const {
      discount, promoName, dateRange,
    } = request.body;
    console.log(dateRange);
    const promo = (await query(
      `
          INSERT INTO promotions (discount, promo_name, start_time, end_time) 
          VALUES ($1, $2, $3, $4)
          RETURNING promo_id, promo_name
          `,
      [discount, promoName, new Date(dateRange[0]), new Date(dateRange[1])],
    )).rows[0];
    response.status(200).json({
      promo: {
        promoId: promo.promo_id,
        promoCode: promo.promo_code,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send('An error occured with creating the promotion');
  }
};

const getPromotions = async (request, response) => {
  try {
    const promotions = (await query(
      `
        SELECT DISTINCT P.promo_id, P.discount, P.promo_name, P.start_time, P.end_time
        FROM Promotions P 
        `,
    )).rows.map((promo) => ({
      promoId: promo.promo_id,
      discount: promo.discount,
      promoName: promo.promo_name,
      startTime: promo.start_time,
      endTime: promo.end_time,
    }));
    return response.status(200).json(promotions);
  } catch (error) {
    console.log(error);
    return response.status(500).send('restaurant could not be found');
  }
};

module.exports = {
  createPromotion,
  getPromotions,
};
