CREATE TABLE orders 
(
    order_id SERIAL,
    total_cost NUMERIC(10, 2) NOT NULL,
    CONSTRAINT positive_total_cost CHECK (total_cost > 0),
    status TEXT NOT NULL DEFAULT 'preparing', -- 'preparing' | 'delivering' | 'completed' 
    CHECK (status IN ('preparing', 'delivering', 'completed')),
    delivery_location TEXT NOT NULL,
    delivery_fee NUMERIC(10, 2) NOT NULL,
    customer_id INTEGER NOT NULL,
    rating INTEGER,
    CONSTRAINT valid_rating CHECK (rating IN (1, 2, 3, 4, 5)),
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (order_id),
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id) ON DELETE CASCADE
);

-- Order can have multiple promotions
CREATE TABLE promotions
(
    promo_id SERIAL,
    discount INTEGER NOT NULL,
    promo_name TEXT NOT NULL UNIQUE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    CONSTRAINT check_time_validity CHECK (EXTRACT(EPOCH FROM end_time) > EXTRACT(EPOCH FROM start_time) AND EXTRACT(EPOCH FROM start_time) >= EXTRACT(EPOCH FROM current_timestamp)),
    PRIMARY KEY (promo_id)
);

CREATE TABLE offers
(
    promo_id INTEGER,
    restaurant_id INTEGER,
    PRIMARY KEY (promo_id),
    FOREIGN KEY (promo_id) REFERENCES promotions (promo_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE applies
(
    promo_id INTEGER,
    order_id INTEGER,
    PRIMARY KEY (promo_id, order_id),
    FOREIGN KEY (promo_id) REFERENCES promotions (promo_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

CREATE TABLE contain
(
    order_id INTEGER, 
    restaurant_id INTEGER,
    food_name TEXT,
    quantity INTEGER NOT NULL,
    CONSTRAINT positive_quantity CHECK (quantity > 0),
    PRIMARY KEY (order_id, restaurant_id, food_name),
    FOREIGN KEY (restaurant_id, food_name) REFERENCES foods (restaurant_id, food_name),
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

CREATE TABLE delivers
(
    delivery_id SERIAL,
    rider_id INTEGER NOT NULL,
    order_id INTEGER NOT NULL UNIQUE,
    delivery_fee NUMERIC(10, 2) NOT NULL,
    departure_time TIME,
    arrival_time TIME,
    completion_time TIME,
    collection_time TIME,
    PRIMARY KEY (delivery_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);
