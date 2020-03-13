CREATE TABLE orders 
(
    order_id SERIAL PRIMARY KEY,
    total_cost NUMERIC(10,2),
    price NUMERIC(10,2),
    status text , 
    created_at TIMESTAMP DEFAULT current_timestamp,
    modified_at TIMESTAMP DEFAULT current_timestamp
);
/*Order can have multiple promotions*/
CREATE TABLE promotions
(
    promo_id SERIAL PRIMARY KEY,
    order_id SERIAL,
    discount DECIMAL(5,2), 
    start_time DATE,
    end_time DATE,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

/*Order can only have one location*/
CREATE TABLE locations 
(
    order_id SERIAL PRIMARY KEY,
    address text,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
