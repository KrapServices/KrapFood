CREATE TABLE restaurants (
  restaurant_id SERIAL,
  price_threshold NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  restaurant_name TEXT NOT NULL DEFAULT '',
  restaurant_location TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (restaurant_id)
);

CREATE TABLE foods (
  category TEXT,
  food_name TEXT,
  daily_limit INTEGER NOT NULL DEFAULT 10000000 CHECK (daily_limit >= 0),
  availability boolean NOT NULL DEFAULT TRUE,
  price NUMERIC(10, 2) NOT NULL,
  CONSTRAINT positive_price CHECK (price > 0),
  restaurant_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (restaurant_id, food_name),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id) ON DELETE CASCADE ON UPDATE CASCADE
);
