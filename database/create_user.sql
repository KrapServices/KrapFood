CREATE TABLE users
(
    user_id SERIAL,
    email TEXT NOT NULL UNIQUE, -- candidate key
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (user_id)
);

CREATE TABLE customers
(
    customer_id INTEGER,
    name TEXT,
    order_count INTEGER NOT NULL DEFAULT 0,
    points INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES users (user_id) ON DELETE CASCADE,
    PRIMARY KEY (customer_id)
);

CREATE TABLE cards  
(
    card_number TEXT UNIQUE,
    expiry_month INTEGER NOT NULL,
    expiry_year INTEGER NOT NULL,
    customer_id INTEGER,
    name_card Text,
    CONSTRAINT valid_card CHECK (card_number ~* '\d{16}'),
    CONSTRAINT valid_month CHECK (expiry_month <= 12 AND expiry_month >= 1),
    CONSTRAINT valid_year CHECK (expiry_year >= 2020),
    PRIMARY KEY (customer_id, card_number),
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id) ON DELETE CASCADE
);

CREATE TABLE managers
(
    manager_id INTEGER,
    PRIMARY KEY (manager_id),
    FOREIGN KEY (manager_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE riders
(
    rider_id INTEGER,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- ENFORCE NON-OVERLAP CONSTRAINT ON PART-TIME AND FULL-TIME USING TRIGGERS

CREATE TABLE part_time_riders
(
    rider_id INTEGER,
    salary_per_hour NUMERIC(5, 2) NOT NULL DEFAULT 10.00,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id) ON DELETE CASCADE
);

CREATE TABLE full_time_riders
(
    rider_id INTEGER,
    base_salary INTEGER NOT NULL DEFAULT 2000,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id) ON DELETE CASCADE
);

CREATE TABLE staff
(
    staff_id INTEGER,
    restaurant_id INTEGER,
    PRIMARY KEY (restaurant_id, staff_id),
    FOREIGN KEY (staff_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id) ON DELETE CASCADE
);

CREATE TABLE food_reviews (
  restaurant_id INTEGER NOT NULL,
  food_name TEXT,
  customer_id SERIAL,
  review TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (customer_id, restaurant_id, food_name),
  FOREIGN KEY (restaurant_id, food_name) REFERENCES foods (restaurant_id, food_name) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES Customers (customer_id) ON DELETE CASCADE
);