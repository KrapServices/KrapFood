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
    customer_id SERIAL,
    order_count INTEGER NOT NULL DEFAULT 0,
    points INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES users (user_id),
    PRIMARY KEY (customer_id)
);

CREATE TABLE cards  
(
    card_number TEXT,
    customer_id INTEGER,
    PRIMARY KEY (customer_id, card_number),
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

CREATE TABLE managers
(
    manager_id INTEGER,
    PRIMARY KEY (manager_id),
    FOREIGN KEY (manager_id) REFERENCES users (user_id)
);

CREATE TABLE riders
(
    rider_id INTEGER,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES users (user_id)
);

-- ENFORCE NON-OVERLAP CONSTRAINT ON PART-TIME AND FULL-TIME USING TRIGGERS

CREATE TABLE part_time_riders
(
    rider_id INTEGER,
    salary_per_hour NUMERIC(5, 2) NOT NULL,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id)
);

CREATE TABLE full_time_riders
(
    rider_id INTEGER,
    base_salary INTEGER NOT NULL,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id)
);

CREATE TABLE timeslots (
  day INTEGER,
  hour INTEGER,
  PRIMARY KEY (day, hour)
);

CREATE TABLE weekly_work_schedule
(
    schedule_id SERIAL,
    -- start_date DATE NOT NULL,
    -- end_date DATE NOT NULL,
    year INTEGER NOT NULL,
    week INTEGER NOT NULL,
    CONSTRAINT valid_week CHECK (week > 0 AND week <= 52),
    PRIMARY KEY (schedule_id)
);

-- CREATE TABLE work_block
-- (
--     block_id SERIAL,
--     work_date DATE NOT NULL,
--     start_hour INTEGER NOT NULL,
--     end_hour INTEGER NOT NULL,
--     CHECK (start_hour >= 0 AND start_hour <= 23),
--     CHECK (end_hour >= 0 AND end_hour <= 23),
--     CONSTRAINT less_than_five_hours CHECK (end_hour - start_hour < 5),
--     PRIMARY KEY (block_id)
-- );

CREATE TABLE consists
(
    schedule_id INTEGER,
    day INTEGER NOT NULL,
    hour INTEGER NOT NULL,
    PRIMARY KEY (schedule_id, day, hour),
    FOREIGN KEY (schedule_id) REFERENCES weekly_work_schedule (schedule_id),
    FOREIGN KEY (day, hour) REFERENCES timeslots (day, hour)
);

CREATE TABLE works
(
    rider_id INTEGER,
    schedule_id INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (rider_id, schedule_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id),
    FOREIGN KEY (schedule_id) REFERENCES weekly_work_schedule (schedule_id)
);

CREATE TABLE manages
(
    manager_id INTEGER,
    rider_id INTEGER,
    PRIMARY KEY (manager_id, rider_id),
    FOREIGN KEY (manager_id) REFERENCES managers (manager_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id)
);

CREATE TABLE staff
(
    staff_id INTEGER,
    restaurant_id INTEGER,
    PRIMARY KEY (restaurant_id, staff_id),
    FOREIGN KEY (staff_id) REFERENCES users (user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
);