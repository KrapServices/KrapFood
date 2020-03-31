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
    name TEXT,
    order_count INTEGER NOT NULL DEFAULT 0,
    points INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES users (user_id) ON DELETE CASCADE,
    PRIMARY KEY (customer_id)
);

CREATE TABLE cards  
(
    card_number TEXT,
    expiry TEXT,
    customer_id INTEGER,
    name_card Text,
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

-- Use trigger to enforce mininum one hour break between work shifts
-- Use trigger to enforce no overlap between weekly work schedules
-- Use trigger to enforce min and max total hours

CREATE TABLE weekly_work_schedule
(
    schedule_id SERIAL,
    rider_id INTEGER NOT NULL,
    first_date DATE NOT NULL,
    PRIMARY KEY (schedule_id),
    FOREIGN KEY (rider_id) REFERENCES part_time_riders (rider_id)
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

CREATE OR REPLACE FUNCTION check_wws_overlap() RETURNS TRIGGER
    AS $$
DECLARE
    f_date DATE;
BEGIN
    SELECT W.first_date INTO f_date
        FROM weekly_work_schedule W
        WHERE W.rider_id = NEW.rider_id
        AND W.schedule_id <> NEW.schedule_id
        AND (W.first_date - NEW.first_date <= '6'
        AND W.first_date - NEW.first_date >= '0' 
        OR NEW.first_date - W.first_date <= '6'
        AND NEW.first_date - W.first_date >= '0');
    IF f_date IS NOT NULL THEN
        RAISE exception '% clashing with %', NEW.first_date, f_date;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS wws_overlap_trigger ON weekly_work_schedule CASCADE;
CREATE TRIGGER wws_overlap_trigger
    AFTER INSERT ON weekly_work_schedule
    FOR EACH ROW
    EXECUTE PROCEDURE check_wws_overlap();

CREATE OR REPLACE FUNCTION check_wws_hours() RETURNS TRIGGER
    AS $$
DECLARE
    total_hours INTERVAL;
BEGIN
    WITH durations AS (
        SELECT end_hour - start_hour AS duration
        FROM wws_consists C
        WHERE NEW.schedule_id = C.schedule_id
    )
    SELECT sum(duration) INTO total_hours
    FROM durations;
    IF total_hours IS NULL OR total_hours < '10 hour' OR total_hours > '48 hour' THEN
        RAISE exception 'Schedule has % total hours', total_hours;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS wws_hours_trigger ON weekly_work_schedule CASCADE;
CREATE CONSTRAINT TRIGGER wws_hours_trigger
    AFTER INSERT ON weekly_work_schedule
    DEFERRABLE INITIALLY DEFERRED
    FOR EACH ROW
    EXECUTE PROCEDURE check_wws_hours();

CREATE OR REPLACE FUNCTION check_shift_overlaps() RETURNS TRIGGER
    AS $$
DECLARE
    overlap_exists INTEGER;
BEGIN
    SELECT 1 INTO overlap_exists
    FROM wws_consists C
    WHERE NEW.schedule_id = C.schedule_id
    AND NEW.day_of_week = C.day_of_week
    AND (NEW.start_hour <> C.start_hour OR NEW.end_hour <> C.end_hour)
    AND (NEW.start_hour - INTERVAL '1 hour', NEW.end_hour + INTERVAL '1 hour') OVERLAPS (C.start_hour, C.end_hour);
    IF overlap_exists IS NOT NULL THEN
        RAISE exception 'Shift overlap detected';
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS shift_overlap_trigger ON wws_consists CASCADE;
CREATE TRIGGER shift_overlap_trigger
    AFTER INSERT ON wws_consists
    FOR EACH ROW
    EXECUTE PROCEDURE check_shift_overlaps();