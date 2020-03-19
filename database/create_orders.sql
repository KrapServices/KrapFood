CREATE TABLE orders 
(
    order_id SERIAL PRIMARY KEY,
    total_cost NUMERIC(10, 2) NOT NULL,
    CONSTRAINT positive_total_cost CHECK (total_cost > 0),
    status TEXT NOT NULL DEFAULT 'preparing', -- 'preparing' | 'delivering' | 'completed' 
    CHECK (status IN ('preparing', 'delivering', 'completed')),
    delivery_location TEXT NOT NULL,
    customer_id INTEGER NOT NULL,
    rating INTEGER,
    CONSTRAINT valid_rating CHECK (rating IN (1, 2, 3, 4, 5)),
    created_at TIMESTAMP DEFAULT current_timestamp,
    modified_at TIMESTAMP DEFAULT current_timestamp,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

-- Order can have multiple promotions
CREATE TABLE promotions
(
    promo_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    discount INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

CREATE TABLE contain
(
    order_id INTEGER, 
    food_id INTEGER,
    quantity INTEGER NOT NULL,
    CONSTRAINT positive_quantity CHECK (quantity > 0),
    PRIMARY KEY (order_id, food_id),
    FOREIGN KEY (food_id) REFERENCES foods (food_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

CREATE TABLE delivers
(
    delivery_id SERIAL,
    rider_id INTEGER NOT NULL,
    order_id INTEGER NOT NULL UNIQUE,
    PRIMARY KEY (delivery_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);