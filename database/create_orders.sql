CREATE TABLE orders 
(
    order_id SERIAL PRIMARY KEY,
    total_cost NUMERIC(10, 2) NOT NULL,
    CONSTRAINT positive_total_cost CHECK (total_cost > 0),
    status TEXT NOT NULL DEFAULT 'preparing', -- 'preparing' | 'delivering' | 'completed' 
    CHECK (status IN ('preparing', 'delivering', 'completed')),
    delivery_location TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp,
    modified_at TIMESTAMP DEFAULT current_timestamp
);

-- Order can have multiple promotions
CREATE TABLE promotions
(
    promo_id SERIAL PRIMARY KEY,
    order_id SERIAL NOT NULL,
    discount INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

CREATE TABLE contain
(
    order_id SERIAL, 
    food_id SERIAL,
    quantity INTEGER NOT NULL,
    CONSTRAINT positive_quantity CHECK (quantity > 0),
    PRIMARY KEY (order_id, food_id),
    FOREIGN KEY (food_id) REFERENCES foods(food_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);