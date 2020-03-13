CREATE TABLE restaurants (
  restaurant_id SERIAL PRIMARY KEY,
  threshold NUMERIC(10, 2),
  restaurant_name TEXT,
  restaurant_location TEXT,
  delivery_fee NUMERIC(10, 2),
  created_at TIMESTAMP DEFAULT current_timestamp,
  modified_at TIMESTAMP DEFAULT current_timestamp
);
/*
CREATE TABLE menus (
  menu_id SERIAL PRIMARY KEY,
  restaurant_id INTEGER UNIQUE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id),
  created_at TIMESTAMP DEFAULT current_timestamp,
  modified_at TIMESTAMP DEFAULT current_timestamp
);*/

CREATE TABLE foods (
  food_id SERIAL PRIMARY KEY,
  category TEXT,
  food_name TEXT,
  daily_limit int, 
  availability boolean DEFAULT TRUE,
  price NUMERIC(10, 2),
  restaurant_id INTEGER NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id),
  created_at TIMESTAMP DEFAULT current_timestamp,
  modified_at TIMESTAMP DEFAULT current_timestamp
);