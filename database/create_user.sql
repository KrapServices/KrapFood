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
    FOREIGN KEY (customer_id) REFERENCES users (user_id) ON DELETE CASCADE,
    PRIMARY KEY (customer_id)
);

CREATE TABLE cards  
(
    card_number TEXT,
    customer_id INTEGER,
    PRIMARY KEY (customer_id, card_number),
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id) ON DELETE CASCADE
);

CREATE TABLE managers
(
    manager_id INTEGER,
    PRIMARY KEY (manager_id),
    FOREIGN KEY (manager_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE riders
(
    rider_id INTEGER,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- ENFORCE NON-OVERLAP CONSTRAINT ON PART-TIME AND FULL-TIME USING TRIGGERS

CREATE TABLE part_time_riders
(
    rider_id INTEGER,
    salary_per_hour NUMERIC(5, 2) NOT NULL,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id) ON DELETE CASCADE
);

CREATE TABLE full_time_riders
(
    rider_id INTEGER,
    base_salary INTEGER NOT NULL,
    PRIMARY KEY (rider_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id) ON DELETE CASCADE
);

CREATE TABLE timeslots (
  day INTEGER,
  hour INTEGER,
  PRIMARY KEY (day, hour)
);

-- CREATE TABLE weekly_work_schedule
-- (
--     schedule_id SERIAL,
--     -- start_date DATE NOT NULL,
--     -- end_date DATE NOT NULL,
--     year INTEGER NOT NULL,
--     week INTEGER NOT NULL,
--     CONSTRAINT valid_week CHECK (week > 0 AND week <= 52),
--     PRIMARY KEY (schedule_id)
-- );

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

-- CREATE TABLE consists
-- (
--     schedule_id INTEGER,
--     day INTEGER NOT NULL,
--     hour INTEGER NOT NULL,
--     PRIMARY KEY (schedule_id, day, hour),
--     FOREIGN KEY (schedule_id) REFERENCES weekly_work_schedule (schedule_id),
--     FOREIGN KEY (day, hour) REFERENCES timeslots (day, hour)
-- );

-- CREATE TABLE works
-- (
--     rider_id INTEGER,
--     schedule_id INTEGER,
--     created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
--     PRIMARY KEY (rider_id, schedule_id),
--     FOREIGN KEY (rider_id) REFERENCES riders (rider_id),
--     FOREIGN KEY (schedule_id) REFERENCES weekly_work_schedule (schedule_id)
-- );

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
    FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id) ON DELETE CASCADE
);

-- CREATE TABLE shift
-- (
--     shift_id SERIAL,
--     shift_date DATE NOT NULL,
--     day_of_week INTEGER NOT NULL,
--     CONSTRAINT valid_day_of_week CHECK (day_of_week >= 0 AND day_of_week <= 7),
--     start_hour INTEGER NOT NULL,
--     CHECK (start_hour >= 0 AND start_hour <= 23),
--     end_hour INTEGER NOT NULL,
--     CHECK (end_hour >= 0 AND end_hour <= 23),
--     CONSTRAINT valid_duration CHECK (end_hour - start_hour < 5),
--     PRIMARY KEY (shift_id)
-- );

-- CREATE TABLE follows
-- (
--     rider_id INTEGER,
--     shift_id INTEGER,
--     PRIMARY KEY (rider_id, shift_id),
--     FOREIGN KEY (rider_id) REFERENCES riders (rider_id),
--     FOREIGN KEY (shift_id) REFERENCES shift (shift_id)
-- )

-- enforce WWS constraints using triggers

-- CREATE TABLE works
-- (
--     rider_id INTEGER,
--     work_date DATE,
--     start_hour INTEGER,
--     end_hour INTEGER,
--     PRIMARY KEY (work_date, start_hour, end_hour),
--     FOREIGN KEY (rider_id) REFERENCES riders (rider_id),
--     FOREIGN KEY (start_hour, end_hour) REFERENCES workshift (start_hour, end_hour)
-- );

-- Use trigger to enforce mininum one hour break between work shifts
-- Use trigger to enforce no overlap between weekly work schedules
-- Use trigger to enforce min and max total hours

CREATE TABLE weekly_work_schedule
(
    schedule_id SERIAL,
    first_date DATE NOT NULL,
    PRIMARY KEY (schedule_id)
);

CREATE TABLE wws_consists
(
    schedule_id INTEGER,
    day_of_week INTEGER,
    start_hour TIME,
    end_hour TIME,
    PRIMARY KEY (schedule_id, day_of_week, start_hour, end_hour),
    FOREIGN KEY (schedule_id) REFERENCES weekly_work_schedule (schedule_id),
    FOREIGN KEY (day_of_week, start_hour, end_hour) REFERENCES workshift (day_of_week, start_hour, end_hour)
);

CREATE TABLE pt_works
(
    rider_id INTEGER,
    schedule_id INTEGER,
    PRIMARY KEY (rider_id, schedule_id),
    FOREIGN KEY (rider_id) REFERENCES part_time_riders (rider_id),
    FOREIGN KEY (schedule_id) REFERENCES weekly_work_schedule (schedule_id)
);