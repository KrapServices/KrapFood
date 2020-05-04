BEGIN;
INSERT INTO users
    (user_id, email, password)
VALUES
    (1, 'c0', 'p0');

INSERT INTO customers
    (customer_id, name)
VALUES
    (1, 'Bob');

INSERT INTO cards
    (card_number, expiry, customer_id, name_card)
VALUES
    ('1234 5678 1234 5678', '5/22', 1, 'Main card');

INSERT INTO users
    (user_id, email, password)
VALUES
    (2, 'c1', 'p1');

INSERT INTO customers
    (customer_id, name)
VALUES
    (2, 'Alice');

INSERT INTO cards
    (card_number, expiry, customer_id, name_card)
VALUES
    ('1234 5678 1234 5679', '5/22', 2, 'Main card');

INSERT INTO users
    (user_id, email, password)
VALUES
    (3, 'c2', 'p2');

INSERT INTO customers
    (customer_id, name)
VALUES
    (3, 'Charlie');

INSERT INTO cards
    (card_number, expiry, customer_id, name_card)
VALUES
    ('1234 5678 1234 5670', '5/22', 3, 'Main card');

INSERT INTO users
    (user_id, email, password)
VALUES
    (4, 'r0', 'p0');
INSERT INTO riders
    (rider_id)
VALUES
    (4);
INSERT INTO part_time_riders
    (rider_id)
VALUES
    (4);

INSERT INTO users
    (user_id, email, password)
VALUES
    (5, 'r1', 'p1');
INSERT INTO riders
    (rider_id)
VALUES
    (5);
INSERT INTO full_time_riders
    (rider_id)
VALUES
    (5);

INSERT INTO users
    (user_id, email, password)
VALUES
    (6, 's0', 'p0');
INSERT INTO staff
    (staff_id, restaurant_id)
VALUES
    (6, 1);

--SELECT setval('user_id_seq', max(user_id)) FROM users;
   
--SELECT setval('customer_id_seq', max(customer_id))  FROM customers;

COMMIT;

BEGIN;

INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (1, 20, 'CB20', '2020-05-15 12:00:00', '2020-06-01 13:00:00');

INSERT INTO offers
    (promo_id, restaurant_id)
VALUES
    (1, 1);

INSERT INTO promotions
    (promo_id, discount, promo_name, start_time, end_time)
VALUES
    (2, 30, 'MARCH10', '2020-03-01 10:00:00', '2020-03-31 22:00:00');

INSERT INTO promotional_campaigns
    (campaign_id, campaign_name)
VALUES
    (1, 'MARCH2020');

INSERT INTO includes
    (campaign_id, promo_id)
VALUES
    (1, 2);
COMMIT;

-- order 1
BEGIN TRANSACTION;
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (1, 51, 'completed', '5 chicken road', 1, 5, '2020-04-12 13:00:00', '2020-04-12 15:00:00', 5);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (1, 5, 1, '13:01:00', '13:15:00', '13:20:00', '13:30:00');
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (1, 1, '1 test 1', 1);
INSERT INTO applies
    (promo_id, order_id)
VALUES
    (1, 1);
-- insert into orders (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
-- values (2, 51, 'completed', '5 chicken road', 1, 5, '2020-04-12 13:00:00', '2020-04-12 14:00:00', 5);

-- insert into delivers (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
-- values (2, 5, 2, '13:00:00', '13:01:00', '13:20:00', '13:25:00');
COMMIT;

-- order 2
BEGIN;
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (2, 51, 'completed', '5 chicken road', 1, 5, '2020-04-12 13:00:00', '2020-04-12 15:00:00', 5);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (2, 1, '1 test 1', 1);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (2, 5, 2, '13:01:00', '13:15:00', '13:20:00', '13:30:00');
COMMIT; 

-- order 3
BEGIN; 
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (3, 51, 'completed', '6 chicken road', 1, 5, '2020-03-12 13:00:00', '2020-03-13 15:00:00', 5);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (3, 1, '1 test 2', 1);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (3, 5, 3, '13:01:00', '13:15:00', '13:20:00', '13:30:00');
COMMIT;

-- order 4
BEGIN;
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (4, 51, 'completed', '7 chicken road', 1, 5, '2020-03-12 13:00:00', '2020-03-13 15:00:00', 5);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (4, 1, '1 test 2', 1);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (4, 5, 4, '13:01:00', '13:15:00', '13:20:00', '13:30:00');
COMMIT;

-- order 5
BEGIN;
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (5, 51, 'completed', '8 chicken road', 1, 5, '2020-03-12 13:00:00', '2020-03-13 15:00:00', 6);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (5, 1, '1 test 3', 1);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (5, 5, 5, '13:01:00', '13:15:00', '13:20:00', '13:30:00');
COMMIT;

--order 6
BEGIN;
INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (6, 51, 'completed', '9 chicken road', 1, 5, '2020-03-12 14:00:00', '2020-03-13 15:00:00', 6);
INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (6, 1, '1 test 4', 1);
INSERT INTO delivers
    (delivery_id, rider_id, order_id, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (6, 5, 6, '13:01:00', '13:15:00', '13:20:00', '13:30:00');
COMMIT;

BEGIN; 
INSERT INTO users (user_id, email, password) VALUES (7, 'abc@test.com', '123');
INSERT INTO riders (rider_id) VALUES (7);
INSERT INTO part_time_riders (rider_id, salary_per_hour) VALUES (7, 1.00);

INSERT INTO users (user_id, email, password) VALUES (8, 'def@test.com', '123');
INSERT INTO riders (rider_id) VALUES (8);
INSERT INTO full_time_riders (rider_id, base_salary) VALUES (8, 1000.00);

INSERT INTO weekly_work_schedules (wws_id, starting_date, ending_date) VALUES (1, '2020-04-01', '2020-04-07');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '100000', '110000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '150000', '160000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '100000', '110000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '100000', '110000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '150000', '160000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-07', '100000', '110000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-07', '110000', '120000');

INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 1);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 2);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 3);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 4);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 5);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 6);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 7);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 8);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 9);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 10);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 11);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 12);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 13);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 14);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 15);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 16);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 17);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 18);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 19);
INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 20);


INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (7, 1);
COMMIT;

BEGIN;

INSERT INTO monthly_work_schedules (starting_date, ending_date) VALUES ('2020-04-01', '2020-04-28');

INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '190000', '200000');

INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '190000', '200000');

INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '190000', '200000');

INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '180000', '190000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '190000', '200000');

INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 21);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 22);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 23);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 24);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 25);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 26);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 27);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 28);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 29);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 30);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 31);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 32);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 33);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 34);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 35);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 36);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 37);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 38);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 39);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 40);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 41);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 42);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 43);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 44);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 45);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 46);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 47);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 48);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 49);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 50);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 51);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 52);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 53);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 54);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 55);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 56);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 57);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 58);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 59);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 60);

INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 61);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 62);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 63);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 64);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 65);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 66);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 67);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 68);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 69);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 70);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 71);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 72);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 73);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 74);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 75);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 76);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 77);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 78);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 79);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 80);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 81);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 82);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 83);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 84);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 85);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 86);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 87);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 88);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 89);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 90);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 91);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 92);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 93);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 94);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 95);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 96);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 97);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 98);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 99);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 100);

INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 101);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 102);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 103);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 104);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 105);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 106);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 107);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 108);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 109);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 110);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 111);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 112);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 113);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 114);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 115);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 116);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 117);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 118);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 119);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 120);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 121);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 122);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 123);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 124);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 125);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 126);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 127);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 128);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 129);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 130);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 131);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 132);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 133);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 134);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 135);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 136);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 137);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 138);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 139);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 140);

INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 141);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 142);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 143);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 144);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 145);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 146);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 147);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 148);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 149);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 150);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 151);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 152);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 153);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 154);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 155);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 156);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 157);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 158);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 159);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 160);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 161);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 162);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 163);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 164);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 165);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 166);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 167);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 168);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 169);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 170);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 171);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 172);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 173);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 174);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 175);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 176);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 177);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 178);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 179);
INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 180);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (8, 1);
SELECT setval('users_user_id_seq', (SELECT MAX(user_id) from "users"));
--SELECT setval('customers_customer_id_seq', (SELECT MAX(customer_id) from "customers")); 
--SELECT setval('riders_rider_id_seq', (SELECT MAX(rider_id) from "riders")); 
--SELECT setval('staff_staff_id_seq', (SELECT MAX(staff_id) from "stuff")); 
SELECT setval('promotions_promo_id_seq', (SELECT MAX(promo_id) from "promotions")); 
SELECT setval('promotional_campaigns_campaign_id_seq', (SELECT MAX(campaign_id) from "promotional_campaigns"));
-- it adds one automatically to the max value
COMMIT;