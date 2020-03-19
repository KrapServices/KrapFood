CREATE TABLE restaurants (
  restaurant_id SERIAL,
  price_threshold NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  restaurant_name TEXT NOT NULL DEFAULT '',
  restaurant_location TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  modified_at TIMESTAMP DEFAULT current_timestamp,
  PRIMARY KEY (restaurant_id)
);

CREATE TABLE foods (
  food_id SERIAL NOT NULL UNIQUE,
  category TEXT,
  food_name TEXT NOT NULL DEFAULT '',
  daily_limit INTEGER NOT NULL DEFAULT 10000000,
  availability boolean NOT NULL DEFAULT TRUE,
  price NUMERIC(10, 2) NOT NULL,
  CONSTRAINT positive_price CHECK (price > 0),
  restaurant_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  modified_at TIMESTAMP DEFAULT current_timestamp,
  PRIMARY KEY (restaurant_id, food_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
);