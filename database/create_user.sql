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
    order_count int DEFAULT 0,
    point int DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES users (user_id)
);

CREATE TABLE cards  
(
    customer_id SERIAL,
    card_number text PRIMARY KEY,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE managers
(
    manager_id SERIAL PRIMARY KEY,
    FOREIGN KEY (manager_id) REFERENCES users (user_id)
);


CREATE TABLE riders
(
    rider_id SERIAL PRIMARY KEY,
    FOREIGN KEY (rider_id) REFERENCES users (user_id)
);


CREATE TABLE staff
(
    staff_id SERIAL PRIMARY KEY,
    FOREIGN KEY (staff_id) REFERENCES users (user_id)
);
 