CREATE TABLE restaurants (
  restaurant_id SERIAL PRIMARY KEY,
  threshold NUMERIC(10, 2),
  restaurant_name TEXT,
  restaurant_location TEXT,
  delivery_fee NUMERIC(10, 2)
);

CREATE TABLE menus (
  menu_id SERIAL PRIMARY KEY,
  restaurant_id INTEGER UNIQUE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
);

CREATE TABLE foods (
  food_id SERIAL PRIMARY KEY,
  category TEXT,
  food_name TEXT,
  price NUMERIC(10, 2),
  menu_id INTEGER NOT NULL,
  FOREIGN KEY (menu_id) REFERENCES menus (menu_id) 
);