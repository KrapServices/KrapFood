CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE, -- candidate key
    password TEXT NOT NULL,
    created_at TIMESTAMP default current_timestamp,
    modified_at TIMESTAMP default current_timestamp
);

CREATE TABLE customers
(
    customer_id SERIAL PRIMARY KEY,
    order_count INTEGER NOT NULL DEFAULT 0,
    points INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES users (user_id)
);

CREATE TABLE cards  
(
    card_number TEXT,
    customer_id INTEGER,
    PRIMARY KEY (customer_id, card_number),
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

CREATE TABLE managers
(
    manager_id INTEGER PRIMARY KEY,
    FOREIGN KEY (manager_id) REFERENCES users (user_id)
);

CREATE TABLE riders
(
    rider_id INTEGER PRIMARY KEY,
    FOREIGN KEY (rider_id) REFERENCES users (user_id)
);

CREATE TABLE manages
(
    manager_id INTEGER,
    rider_id INTEGER,
    PRIMARY KEY (manager_id, rider_id),
    FOREIGN KEY (manager_id) REFERENCES managers (manager_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id)
);

CREATE TABLE staff
(
    staff_id INTEGER,
    restaurant_id INTEGER,
    PRIMARY KEY (restaurant_id, staff_id),
    FOREIGN KEY (staff_id) REFERENCES users (user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
);
 