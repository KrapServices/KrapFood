CREATE TABLE users
(
    user_id SERIAL,
    email TEXT NOT NULL UNIQUE, -- candidate key
    password TEXT NOT NULL,
    created_at TIMESTAMP default current_timestamp,
    modified_at TIMESTAMP default current_timestamp,
    PRIMARY KEY (user_id)
);

CREATE TABLE customers
(
    customer_id SERIAL,
    order_count INTEGER NOT NULL DEFAULT 0,
    points INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES users (user_id),
    PRIMARY KEY (customer_id)
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
    manager_id INTEGER,
    PRIMARY KEY (manager_id),
    FOREIGN KEY (manager_id) REFERENCES users (user_id)
);

CREATE TABLE riders
(
    rider_id INTEGER,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES users (user_id)
);

-- ENFORCE NON-OVERLAP CONSTRAINT ON PART-TIME AND FULL-TIME USING TRIGGERS

CREATE TABLE part_time_riders
(
    rider_id INTEGER,
    salary_per_hour NUMERIC(5, 2) NOT NULL,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id)
);

CREATE TABLE full_time_riders
(
    rider_id INTEGER,
    salary INTEGER NOT NULL,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id)
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