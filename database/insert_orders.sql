-- restaurant 1 promotion
INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (1, 10, 'CB10', '2020-03-21 12:00:00', '2020-05-21 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (1, 1);

INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (2, 10, 'MAC10', '2020-05-01 12:00:00', '2020-05-17 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (2, 1);

-- restaurant 2 no promotions

-- restaurant 3 promotion
INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (3, 10, 'LJXD10', '2020-05-01 12:00:00', '2020-05-17 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (3, 3);

-- restaurant 4 promotion
INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (4, 10, 'FF10', '2020-05-01 12:00:00', '2020-05-17 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (4, 4);

-- restaurant 5 promotion
INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (5, 10, 'SUSHI4EVA', '2020-05-01 12:00:00', '2020-05-17 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (5, 5);

-- restaurant 6 promotion
INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (6, 10, 'PIZZA10', '2020-03-22 12:00:00', '2020-04-30 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (6, 6);

INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (7, 10, 'pizzaz', '2020-05-01 12:00:00', '2020-05-21 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (7, 6);

-- restaurant 7 no promotion

-- restaurant 8 promotion
INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (8, 10, 'COVFEFE', '2020-03-22 12:00:00', '2020-05-22 13:00:00');

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
    (1, 'APRIL PROMOS');

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
    (10, 20, 'ENDAPRIL20', '2020-04-25 12:00:00', '2020-04-30 22:00:00');

INSERT INTO includes
    (campaign_id, promo_id)
VALUES
    (1, 10);

-- FDS-wide promotion campaign 2

INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (11, 20, 'MAY20', '2020-05-01 12:00:00', '2020-05-31 22:00:00');

INSERT INTO promotional_campaigns
    (campaign_id, campaign_name)
VALUES
    (2, 'MAY PROMOS');

INSERT INTO includes
    (campaign_id, promo_id)
VALUES
    (2, 11);


SELECT setval('promotions_promo_id_seq', (SELECT MAX(promo_id) from "promotions")); 
SELECT setval('promotional_campaigns_campaign_id_seq', (SELECT MAX(campaign_id) from "promotional_campaigns"));

-- insert orders

-- order 1
BEGIN;
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (1, 9, 'completed', '5 chicken road', 1, 5, '2020-03-22 10:00:00', '2020-03-22 11:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (1, 51, 1, '10:01:00', '10:15:00', '10:20:00', '10:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (1, 1, '1 test 1', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (1, 1);

-- order 2
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (2, 20, 'completed', '6 chin road', 2, 5, '2020-03-25 11:00:00', '2020-03-25 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (2, 52, 2, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (2, 2, '2 test 2', 1);


-- order 3
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (3, 90, 'completed', '6 test road', 3, 4, '2020-03-25 18:00:00', '2020-03-25 22:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (3, 53, 3, '18:01:00', '18:15:00', '18:20:00', '18:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (3, 3, '3 test 1', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (3, 3, '3 test 2', 2);

-- order 4
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (4, 40, 'completed', '6 avenue road', 4, 4, '2020-03-26 14:00:00', '2020-03-26 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (4, 54, 4, '14:01:00', '14:15:00', '14:20:00', '14:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (4, 4, '4 test 1', 1);

-- order 5
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (5, 50, 'completed', '6 chin road', 5, 3, '2020-03-27 18:00:00', '2020-03-27 22:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (5, 55, 5, '18:01:00', '18:15:00', '18:20:00', '18:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (5, 5, '5 test 1', 1);

-- order 6
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (6, 18, 'completed', '8 chicken road', 6, 5, '2020-03-28 11:00:00', '2020-03-28 12:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (6, 56, 6, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (6, 6, '6 test 1', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (6, 6, '6 test 2', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (6, 6);

-- order 7
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (7, 40, 'completed', '8 henderson road', 7, 5, '2020-03-28 12:00:00', '2020-03-28 13:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (7, 57, 7, '12:01:00', '12:15:00', '12:20:00', '12:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (7, 7, '7 test 1', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (7, 7, '7 test 2', 1);

-- order 8
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (8, 54, 'completed', '8 henderson road', 8, 5, '2020-03-28 13:00:00', '2020-03-28 14:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (8, 58, 8, '13:01:00', '13:15:00', '13:20:00', '13:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (8, 8, '8 test 1', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (8, 8, '8 test 2', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (8, 8);

-- order 9
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (9, 80, 'completed', '9 henderson road', 9, 4, '2020-03-28 15:00:00', '2020-03-28 16:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (9, 59, 9, '15:01:00', '15:15:00', '15:20:00', '15:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (9, 9, '9 test 1', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (9, 9, '9 test 2', 1);

-- order 10
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (10, 12, 'completed', '10 henderson road', 10, 4, '2020-03-29 11:00:00', '2020-03-28 12:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (10, 60, 10, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (10, 10, '10 test 1', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (10, 10, '10 test 2', 2);

-- order 11
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (11, 9, 'completed', '5 chicken road', 11, 5, '2020-03-22 14:00:00', '2020-03-22 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (11, 61, 11, '14:01:00', '14:15:00', '14:20:00', '14:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (11, 1, '1 test 2', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (1, 11);

-- order 12
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (12, 20, 'completed', '5 chin road', 12, 5, '2020-03-25 16:00:00', '2020-03-25 17:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (12, 62, 12, '16:01:00', '16:15:00', '16:20:00', '16:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (12, 2, '2 test 2', 1);

-- order 13
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (13, 90, 'completed', '6 test road', 13, 4, '2020-03-28 15:00:00', '2020-03-28 16:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (13, 63, 13, '15:01:00', '15:15:00', '15:20:00', '15:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (13, 3, '3 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (13, 3, '3 test 4', 2);

-- order 14
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (14, 40, 'completed', '6 avenue road', 14, 4, '2020-03-26 14:00:00', '2020-03-25 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (14, 64, 14, '14:01:00', '14:15:00', '14:20:00', '14:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (14, 4, '4 test 2', 1);

-- order 15
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (15, 50, 'completed', '6 chin road', 15, 3, '2020-03-27 19:00:00', '2020-03-27 22:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (15, 65, 15, '19:01:00', '19:15:00', '19:20:00', '19:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (15, 5, '5 test 2', 1);

-- order 16
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (16, 18, 'completed', '8 chicken road', 16, 5, '2020-03-28 12:00:00', '2020-03-28 13:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (16, 66, 16, '12:01:00', '12:15:00', '12:20:00', '12:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (16, 6, '6 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (16, 6, '6 test 4', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (6, 16);

-- order 17
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (17, 40, 'completed', '8 henderson road', 17, 5, '2020-03-28 11:00:00', '2020-03-28 12:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (17, 67, 17, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (17, 7, '7 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (17, 7, '7 test 4', 1);

-- order 18
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (18, 54, 'completed', '8 henderson road', 18, 5, '2020-03-28 10:00:00', '2020-03-28 11:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (18, 68, 18, '10:01:00', '10:15:00', '10:20:00', '10:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (18, 8, '8 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (18, 8, '8 test 4', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (8, 18);

-- order 19
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (19, 80, 'completed', '9 henderson road', 19, 4, '2020-03-28 15:00:00', '2020-03-28 16:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (19, 69, 19, '15:01:00', '15:15:00', '15:20:00', '15:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (19, 9, '9 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (19, 9, '9 test 4', 1);

-- order 20
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (20, 12, 'completed', '10 henderson road', 20, 4, '2020-03-30 16:00:00', '2020-03-30 17:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (20, 70, 20, '16:01:00', '16:15:00', '16:20:00', '16:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (20, 10, '10 test 4', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (20, 10, '10 test 5', 2);

-- order 21
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (21, 9, 'completed', '5 chicken road', 21, 5, '2020-03-30 17:00:00', '2020-03-30 18:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (21, 71, 21, '17:01:00', '17:15:00', '17:20:00', '17:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (21, 1, '1 test 3', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (1, 21);

-- order 22
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (22, 20, 'completed', '5 chin road', 22, 5, '2020-03-31 16:00:00', '2020-03-31 17:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (22, 72, 22, '16:01:00', '16:15:00', '16:20:00', '16:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (22, 2, '2 test 3', 1);

-- order 23
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (23, 90, 'completed', '6 test road', 23, 4, '2020-03-31 11:00:00', '2020-03-31 12:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (23, 73, 23, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (23, 3, '3 test 4', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (23, 3, '3 test 5', 2);

-- order 24
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (24, 40, 'completed', '6 avenue road', 24, 4, '2020-03-31 20:00:00', '2020-03-31 21:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (24, 74, 24, '20:01:00', '20:15:00', '20:20:00', '20:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (24, 4, '4 test 3', 1);

-- order 25
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (25, 50, 'completed', '6 chin road', 25, 3, '2020-03-31 19:00:00', '2020-03-31 22:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (25, 75, 25, '19:01:00', '19:15:00', '19:20:00', '19:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (25, 5, '5 test 2', 1);


-- order 26
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (26, 9, 'completed', '5 chicken road', 1, 5, '2020-04-01 10:00:00', '2020-04-01 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (26, 51, 26, '10:01:00', '10:15:00', '10:20:00', '10:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (26, 1, '1 test 4', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (1, 26);

-- order 27
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (27, 20, 'completed', '6 chin road', 2, 5, '2020-04-02 11:00:00', '2020-04-02 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (27, 52, 27, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (27, 2, '2 test 4', 1);


-- order 28
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (28, 90, 'completed', '6 test road', 3, 4, '2020-04-05 18:00:00', '2020-04-05 22:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (28, 53, 28, '18:01:00', '18:15:00', '18:20:00', '18:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (28, 3, '3 test 4', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (28, 3, '3 test 5', 2);

-- order 29
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (29, 40, 'completed', '6 avenue road', 4, 4, '2020-04-06 14:00:00', '2020-04-06 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (29, 54, 29, '14:01:00', '14:15:00', '14:20:00', '14:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (29, 4, '4 test 4', 1);

-- order 30
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (30, 50, 'completed', '6 chin road', 5, 3, '2020-04-07 18:00:00', '2020-04-07 22:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (30, 55, 30, '18:01:00', '18:15:00', '18:20:00', '18:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (30, 5, '5 test 4', 1);

-- order 31
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (31, 18, 'completed', '8 chicken road', 6, 5, '2020-04-10 11:00:00', '2020-04-10 12:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (31, 56, 31, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (31, 6, '6 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (31, 6, '6 test 4', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (6, 31);

-- order 32
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (32, 40, 'completed', '8 henderson road', 7, 5, '2020-04-11 12:00:00', '2020-04-11 13:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (32, 57, 32, '12:01:00', '12:15:00', '12:20:00', '12:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (32, 7, '7 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (32, 7, '7 test 4', 1);

-- order 33
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (33, 54, 'completed', '8 henderson road', 8, 5, '2020-04-12 13:00:00', '2020-04-12 14:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (33, 58, 33, '13:01:00', '13:15:00', '13:20:00', '13:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (33, 8, '8 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (33, 8, '8 test 4', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (8, 33);

-- order 34
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (34, 80, 'completed', '9 henderson road', 9, 4, '2020-04-12 15:00:00', '2020-04-12 16:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (34, 59, 34, '15:01:00', '15:15:00', '15:20:00', '15:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (34, 9, '9 test 1', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (34, 9, '9 test 2', 1);

-- order 35
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (35, 12, 'completed', '10 henderson road', 10, 4, '2020-04-13 11:00:00', '2020-04-13 12:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (35, 60, 35, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (35, 10, '10 test 1', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (35, 10, '10 test 2', 2);

-- order 36
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (36, 9, 'completed', '5 chicken road', 11, 5, '2020-04-14 14:00:00', '2020-04-14 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (36, 61, 36, '14:01:00', '14:15:00', '14:20:00', '14:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (36, 1, '1 test 2', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (2, 36);

-- order 37
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (37, 20, 'completed', '5 chin road', 12, 5, '2020-04-15 16:00:00', '2020-04-15 17:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (37, 62, 37, '16:01:00', '16:15:00', '16:20:00', '16:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (37, 2, '2 test 2', 1);

-- order 38
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (38, 90, 'completed', '6 test road', 13, 4, '2020-04-17 15:00:00', '2020-04-17 16:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (38, 63, 38, '15:01:00', '15:15:00', '15:20:00', '15:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (38, 3, '3 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (38, 3, '3 test 4', 2);

-- order 39
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (39, 40, 'completed', '6 avenue road', 14, 4, '2020-04-16 14:00:00', '2020-04-16 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (39, 64, 39, '14:01:00', '14:15:00', '14:20:00', '14:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (39, 4, '4 test 2', 1);

-- order 40
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (40, 50, 'completed', '6 chin road', 15, 3, '2020-04-17 19:00:00', '2020-04-17 22:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (40, 65, 40, '19:01:00', '19:15:00', '19:20:00', '19:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (40, 5, '5 test 2', 1);

-- order 41
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (41, 20, 'completed', '8 chicken road', 16, 5, '2020-04-20 14:00:00', '2020-04-20 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (41, 66, 41, '14:01:00', '14:15:00', '14:20:00', '14:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (41, 6, '6 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (41, 6, '6 test 4', 1);

-- order 42
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (42, 40, 'completed', '8 henderson road', 17, 5, '2020-04-21 11:00:00', '2020-04-21 12:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (42, 67, 42, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (42, 7, '7 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (42, 7, '7 test 4', 1);

-- order 43
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (43, 54, 'completed', '8 henderson road', 18, 5, '2020-04-22 10:00:00', '2020-04-22 11:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (43, 68, 43, '10:01:00', '10:15:00', '10:20:00', '10:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (43, 8, '8 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (43, 8, '8 test 4', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (8, 43);

-- order 44
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (44, 80, 'completed', '9 henderson road', 19, 4, '2020-04-23 15:00:00', '2020-04-23 16:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (44, 69, 44, '15:01:00', '15:15:00', '15:20:00', '15:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (44, 9, '9 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (44, 9, '9 test 4', 1);

-- order 45
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (45, 12, 'completed', '10 henderson road', 20, 4, '2020-04-24 16:00:00', '2020-04-24 17:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (45, 70, 45, '16:01:00', '16:15:00', '16:20:00', '16:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (45, 10, '10 test 4', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (45, 10, '10 test 5', 2);

-- order 46
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (46, 9, 'completed', '5 chicken road', 21, 5, '2020-04-25 17:00:00', '2020-04-25 18:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (46, 71, 46, '17:01:00', '17:15:00', '17:20:00', '17:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (46, 1, '1 test 3', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (1, 46);

-- order 47
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (47, 20, 'completed', '5 chin road', 22, 5, '2020-04-26 16:00:00', '2020-04-26 17:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (47, 72, 47, '16:01:00', '16:15:00', '16:20:00', '16:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (47, 2, '2 test 3', 1);

-- order 48
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (48, 90, 'completed', '6 test road', 23, 4, '2020-04-27 11:00:00', '2020-04-27 12:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (48, 73, 48, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (48, 3, '3 test 4', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (48, 3, '3 test 5', 2);

-- order 49
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (49, 40, 'completed', '6 avenue road', 24, 4, '2020-04-28 20:00:00', '2020-04-28 21:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (49, 74, 49, '20:01:00', '20:15:00', '20:20:00', '20:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (49, 4, '4 test 3', 1);

-- order 50
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (50, 50, 'completed', '6 chin road', 25, 3, '2020-04-29 19:00:00', '2020-04-29 22:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (50, 75, 50, '19:01:00', '19:15:00', '19:20:00', '19:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (50, 5, '5 test 2', 1);

-- order 51
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (51, 18, 'completed', '8 chicken road', 16, 5, '2020-05-01 14:00:00', '2020-05-01 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (51, 66, 51, '14:01:00', '14:15:00', '14:20:00', '14:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (51, 6, '6 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (51, 6, '6 test 4', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (7, 51);

-- order 52
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (52, 40, 'completed', '8 henderson road', 17, 5, '2020-05-01 11:00:00', '2020-05-01 12:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (52, 67, 52, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (52, 7, '7 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (52, 7, '7 test 4', 1);

-- order 53
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (53, 54, 'completed', '8 henderson road', 18, 5, '2020-05-02 10:00:00', '2020-05-02 11:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (53, 68, 53, '10:01:00', '10:15:00', '10:20:00', '10:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (53, 8, '8 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (53, 8, '8 test 4', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (8, 53);

-- order 54
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (54, 64, 'completed', '9 henderson road', 19, 4, '2020-05-02 15:00:00', '2020-05-02 16:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (54, 69, 54, '15:01:00', '15:15:00', '15:20:00', '15:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (54, 9, '9 test 3', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (54, 9, '9 test 4', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (10, 54);

-- order 55
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (55, 9.60, 'completed', '10 henderson road', 20, 4, '2020-05-03 16:00:00', '2020-05-03 17:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (55, 70, 55, '16:01:00', '16:15:00', '16:20:00', '16:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (55, 10, '10 test 4', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (55, 10, '10 test 5', 2);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (10, 55);

-- order 56
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (56, 9, 'completed', '5 chicken road', 21, 5, '2020-05-03 17:00:00', '2020-05-03 18:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (56, 71, 56, '17:01:00', '17:15:00', '17:20:00', '17:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (56, 1, '1 test 3', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (1, 56);

-- order 57
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (57, 16, 'completed', '5 chin road', 22, 5, '2020-05-04 16:00:00', '2020-05-04 17:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (57, 72, 57, '16:01:00', '16:15:00', '16:20:00', '16:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (57, 2, '2 test 3', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (10, 57);

-- order 58
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (58, 72, 'completed', '6 test road', 23, 4, '2020-05-04 11:00:00', '2020-05-04 12:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (58, 73, 58, '11:01:00', '11:15:00', '11:20:00', '11:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (58, 3, '3 test 4', 1);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (58, 3, '3 test 5', 2);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (10, 58);

-- order 59
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (59, 36, 'completed', '6 avenue road', 24, 4, '2020-05-05 20:00:00', '2020-05-05 21:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (59, 74, 59, '20:01:00', '20:15:00', '20:20:00', '20:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (59, 4, '4 test 3', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (4, 59);

-- order 60
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (60, 45, 'completed', '6 chin road', 25, 3, '2020-05-05 19:00:00', '2020-05-05 22:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (60, 75, 60, '19:01:00', '19:15:00', '19:20:00', '19:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (60, 5, '5 test 2', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (5, 60);

COMMIT;