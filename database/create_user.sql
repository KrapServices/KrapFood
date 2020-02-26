CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    email text UNIQUE,
    password text,
    created_at TIMESTAMP default current_timestamp,
    modified_at TIMESTAMP default current_timestamp
);

CREATE TABLE customers
(
    customer_id SERIAL PRIMARY KEY,
    card text DEFAULT '0000',
    num_orders int DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES users (user_id)
);

CREATE TABLE managers
(
    manager_id SERIAL PRIMARY KEY,
    FOREIGN KEY (manager_id) REFERENCES users (user_id)
);
 