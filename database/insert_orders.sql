-- restaurant 1 promotion

BEGIN;

INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (1, 20, 'CB20', '2020-03-21 12:00:00', '2020-05-21 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (1, 1);

INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (2, 10, 'MAC10', '2020-04-20 12:00:00', '2020-05-17 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (2, 1);

-- restaurant 2 no promotions

-- restaurant 3 promotion
INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (3, 10, 'LJXD10', '2020-05-02 12:00:00', '2020-05-17 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (3, 3);

-- restaurant 4 promotion
INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (4, 21, 'FF21', '2020-05-04 12:00:00', '2020-05-17 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (4, 4);

-- restaurant 5 promotion
INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (5, 40, 'SUSHI4EVA', '2020-04-04 12:00:00', '2020-05-17 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (5, 5);

-- restaurant 6 promotion
INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (6, 30, 'PIZZA30', '2020-03-22 12:00:00', '2020-04-17 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (6, 6);

INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (7, 20, 'pizzaz', '2020-04-19 12:00:00', '2020-05-21 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (7, 6);

-- restaurant 7 no promotion

-- restaurant 8 promotion
INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (8, 25, 'COVFEFE', '2020-03-22 12:00:00', '2020-05-22 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (8, 8);

-- restaurant 9 no promotion

-- restaurant 10 no promotion

-- FDS-wide promotion campaign 1

INSERT INTO promotional_campaigns
    (campaign_id, campaign_name)
VALUES
    (1, 'MARCHPROMOS');

INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (9, 20, 'MIDAPRIL20', '2020-04-16 12:00:00', '2020-04-24 22:00:00');

INSERT INTO includes
    (campaign_id, promo_id)
VALUES
    (1, 9);

INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (10, 25, 'ENDAPRIL25', '2020-04-25 12:00:00', '2020-04-30 22:00:00');

INSERT INTO includes
    (campaign_id, promo_id)
VALUES
    (1, 10);

-- FDS-wide promotion campaign 2

INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (11, 10, 'MAY10', '2020-05-01 12:00:00', '2020-05-31 22:00:00');

INSERT INTO promotional_campaigns
    (campaign_id, campaign_name)
VALUES
    (2, 'MAY PROMOS');

INSERT INTO includes
    (campaign_id, promo_id)
VALUES
    (2, 11);

COMMIT;