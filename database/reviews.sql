CREATE TABLE food_reviews (
  restaurant_id INTEGER NOT NULL,
  food_name TEXT,
  review_id SERIAL,
  customer_id SERIAL,
  review TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (customer_id, restaurant_id, food_name),
  FOREIGN KEY (restaurant_id, food_name) REFERENCES foods (restaurant_id, food_name) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES Customers (customer_id) ON DELETE CASCADE
);
