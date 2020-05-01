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

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, delivery_fee)
VALUES
    (1, 51, 'completed', '4 chicken road', 1, 5, 5);

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (2, 51, 'completed', '5 chicken road', 1, 5, '2020-03-12 13:00:00', '2020-03-12 15:00:00', 5);

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (3, 51, 'completed', '6 chicken road', 1, 5, '2020-03-12 11:00:00', '2020-03-13 13:00:00', 5);

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (4, 51, 'completed', '7 chicken road', 1, 5, '2020-03-12 11:00:00', '2020-03-13 13:00:00', 5);

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (5, 51, 'completed', '8 chicken road', 1, 5, '2020-03-12 11:00:00', '2020-03-13 13:00:00', 6);

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at, delivery_fee)
VALUES
    (6, 51, 'completed', '9 chicken road', 1, 5, '2020-03-12 11:00:00', '2020-03-13 13:00:00', 6);

INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (1, 1, '1 test 1', 1);

INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (2, 1, '1 test 1', 1);

INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (3, 1, '1 test 2', 1);

INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (4, 1, '1 test 2', 1);

INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (5, 1, '1 test 3', 1);

INSERT INTO contain 
    (order_id, restaurant_id, food_name, quantity)
VALUES
    (6, 1, '1 test 4', 1);

INSERT INTO applies
    (promo_id, order_id)
VALUES
    (1, 1);

INSERT INTO delivers
    (delivery_id, rider_id, order_id, delivery_fee, departure_time, arrival_time, collection_time, completion_time)
VALUES
    (1, 5, 2, 6, '13:01:00', '13:15:00', '13:20:00', '13:30:00');
