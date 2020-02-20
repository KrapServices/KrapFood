CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY NOT NULL,
    email text UNIQUE,
    password text,
    created_at TIMESTAMP default current_timestamp,
    modified_at TIMESTAMP default current_timestamp
);

CREATE TABLE customers
(
    customer_id SERIAL NOT NULL,
    card text,
    num_orders int,
    FOREIGN KEY (customer_id) REFERENCES users (user_id)
)

 