const { query } = require('../database');

const createPromotion = async (request, response) => {
  try {
    const {
      discount, promoName, dateRange, campaignId,
    } = request.body;
    const promo = (await query(
      `
      INSERT INTO promotions (discount, promo_name, start_time, end_time) 
      VALUES ($1, $2, $3, $4)
      RETURNING promo_id, promo_name
      `,
      [discount, promoName, new Date(dateRange[0]), new Date(dateRange[1])],
    )).rows[0];
    const campaign = (await query(
      `
      INSERT INTO includes (campaign_id, promo_id)
      VALUES ($1, $2)
      `,
      [campaignId, promo.promo_id],
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

const createCampaign = async (request, response) => {
  try {
    const {
      discount, promoName, dateRange, campaignName,
    } = request.body;
    const campaign = (await query(
      `
      INSERT INTO promotional_campaigns (campaign_name)
      VALUES ($1)
      RETURNING campaign_id
      `,
      [campaignName],
    )).rows[0];
    const promo = (await query(
      `
      INSERT INTO promotions (discount, promo_name, start_time, end_time) 
      VALUES ($1, $2, $3, $4)
      RETURNING promo_id, promo_name
      `,
      [discount, promoName, new Date(dateRange[0]), new Date(dateRange[1])],
    )).rows[0];
    const includes = (await query(
      `
      INSERT INTO includes (campaign_id, promo_id)
      VALUES ($1, $2)
      `,
      [campaign.campaign_id, promo.promo_id],
    )).rows[0];
    response.status(200).json({
      promo: {
        promoId: promo.promo_id,
        campaignId: campaign.campaign_id,
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
    return response.status(500).send('promotions not found');
  }
};

const getCampaigns = async (request, response) => {
  try {
    const campaigns = (await query(
      `
        SELECT DISTINCT C.campaign_id, C.campaign_name
        FROM  Promotional_Campaigns C
        `,
    )).rows.map((campaign) => ({
      campaignId: campaign.campaign_id,
      campaignName: campaign.campaign_name,
    }));
    return response.status(200).json(campaigns);
  } catch (error) {
    console.log(error);
    return response.status(500).send('campaigns not found');
  }
};

const getPromosByCampaign = async (campaign) => {
  const promos = (await query(
    `
    SELECT P.promo_id as promo_id, discount, promo_name, start_time, end_time
    FROM Includes I JOIN Promotions P ON I.promo_id = P.promo_id
    WHERE campaign_id = $1
    `,
    [campaign.campaignId],
  )).rows.map((promo) => ({
    promoId: promo.promo_id,
    discount: promo.discount,
    promoName: promo.promo_name,
    startTime: promo.start_time,
    endTime: promo.end_time,
  }));
  return {
    ...campaign,
    promotions: promos,
  };
};

const getPromosWithCampaigns = async (request, response) => {
  try {
    const campaigns = (await query(
      `
      SELECT campaign_id, campaign_name
      FROM promotional_campaigns
    `,
    )).rows.map((campaign) => ({
      campaignId: campaign.campaign_id,
      campaignName: campaign.campaign_name,
    }));
    const campaignsWithPromo = await Promise.all(campaigns.map(
      (campaign) => getPromosByCampaign(campaign),
    ));
    return response.status(200).json({ campaigns: campaignsWithPromo });
  } catch (error) {
    console.log(error);
    return response.status(500).send('campaigns not found');
  }
};

module.exports = {
  createPromotion,
  getPromotions,
  getCampaigns,
  createCampaign,
  getPromosWithCampaigns,
};
