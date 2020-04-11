BEGIN;
INSERT INTO users
    (user_id, email, password)
VALUES
    (1, 'c0', 'p0');

INSERT INTO customers
    (customer_id, name)
VALUES
    (1, 'Bob');
COMMIT;

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating)
VALUES
    (1, 51, 'completed', '4 chicken road', 1, 5);

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at)
VALUES
    (2, 51, 'completed', '4 chicken road', 1, 5, '2020-03-12 01:00:00', '2020-03-13 03:00:00');

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at)
VALUES
    (3, 51, 'completed', '4 chicken road', 1, 5, '2020-03-12 01:00:00', '2020-03-13 03:00:00');

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at)
VALUES
    (4, 51, 'completed', '4 chicken road', 1, 5, '2020-03-12 01:00:00', '2020-03-13 03:00:00');

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at)
VALUES
    (5, 51, 'completed', '4 chicken road', 1, 5, '2020-03-12 01:00:00', '2020-03-13 03:00:00');

INSERT INTO orders
    (order_id, total_cost, status, delivery_location, customer_id, rating, created_at, modified_at)
VALUES
    (6, 51, 'completed', '4 chicken road', 1, 5, '2020-03-12 01:00:00', '2020-03-13 03:00:00');

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
