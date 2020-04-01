--user ISA constraint
CREATE OR REPLACE FUNCTION check_user_overlap() RETURNS TRIGGER
    AS $$
DECLARE 
    overlap_user_id INTEGER;
BEGIN 
    WITH all_users AS (
        SELECT customer_id as u_id from customers
        UNION ALL
        SELECT rider_id as u_id from riders
        UNION ALL
        SELECT manager_id as u_id from managers
        UNION ALL
        SELECT staff_id as u_id from staff
    )
    SELECT u_id INTO overlap_user_id
        FROM all_users
        GROUP BY u_id
        HAVING count(u_id) > 1;
    
    IF overlap_user_id IS NOT NULL THEN
        RAISE exception '% should not have 2 user types', overlap_user_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS rider_overlap_trigger ON riders CASCADE;
CREATE TRIGGER rider_overlap_trigger
    AFTER INSERT ON riders
    EXECUTE PROCEDURE check_user_overlap();

DROP TRIGGER IF EXISTS staff_overlap_trigger ON staff CASCADE;
CREATE TRIGGER staff_overlap_trigger
    AFTER INSERT ON staff
    EXECUTE PROCEDURE check_user_overlap();

DROP TRIGGER IF EXISTS manager_overlap_trigger ON managers CASCADE;
CREATE TRIGGER manager_overlap_trigger
    AFTER INSERT ON managers
    EXECUTE PROCEDURE check_user_overlap();

DROP TRIGGER IF EXISTS customer_overlap_trigger ON customers CASCADE;
CREATE TRIGGER customer_overlap_trigger
    AFTER INSERT ON customers
    EXECUTE PROCEDURE check_user_overlap();

--covering constraint users
CREATE OR REPLACE FUNCTION check_user_covering() RETURNS TRIGGER
    AS $$
DECLARE 
    uncovered_user INTEGER;
BEGIN
    SELECT user_id into uncovered_user
    FROM users u
    WHERE NOT EXISTS (
        SELECT 1
        FROM customer c
        WHERE c.customer_id = u.user_id
    )
    AND
    NOT EXISTS (
        SELECT 1
        FROM staff s
        WHERE s.staff_id = u.user_id
    )
    AND
    NOT EXISTS (
        SELECT 1
        FROM manager m
        WHERE m.manager_id = u.user_id
    )
    AND
    NOT EXISTS (
        SELECT 1
        FROM rider r
        WHERE r.rider_id = u.user_id
    );

    IF uncovered_user IS NOT NULL THEN 
        RAISE exception 'user % by belong to one user type', uncovered_user;
    END IF;
    RETURN NULL;

END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS cover_user_trigger ON users;
CREATE TRIGGER cover_user_trigger
    AFTER INSERT ON users
    EXECUTE PROCEDURE check_user_covering();


--riders ISA constraint 
CREATE OR REPLACE FUNCTION check_rider_overlap() RETURNS TRIGGER
    AS $$
DECLARE
    overlap_rider_id INTEGER;
BEGIN
    SELECT rider_id into overlap_rider_id
    FROM part_time_riders p, full_time_riders f
    WHERE p.rider_id = f.rider_id;

    IF overlap_rider_id IS NOT NULL THEN
        RAISE exception '% should not be both part time and full time', overlap_rider_id;
    END IF;
    RETURN NULL;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS part_time_overlap_trigger ON part_time_riders;
CREATE TRIGGER part_time_overlap_trigger
    AFTER INSERT ON part_time_riders
    EXECUTE PROCEDURE check_rider_overlap();

DROP TRIGGER IF EXISTS full_time_overlap_trigger ON full_time_riders;
CREATE TRIGGER full_time_overlap_trigger
    AFTER INSERT ON full_time_riders
    EXECUTE PROCEDURE check_rider_overlap();
    

--covering constraint riders
CREATE OR REPLACE FUNCTION check_rider_covering() RETURNS TRIGGER
    AS $$
DECLARE 
    uncovered_rider INTEGER;
BEGIN
    SELECT rider_id INTO uncovered_rider
    FROM riders r
    WHERE NOT EXISTS(
        SELECT 1
        FROM part_time_riders p
        WHERE p.rider_id = r.rider_id
    )
    AND 
    NOT EXISTS (
        SELECT 1
        FROM full_time_riders f
        WHERE f.rider_id = r.rider_id
    );

    IF uncovered_rider IS NOT NULL THEN
        RAISE exception 'Rider % is neither full time nor part time', uncovered_rider;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS cover_rider_trigger ON riders;
CREATE TRIGGER cover_rider_trigger
    AFTER INSERT ON riders
    EXECUTE PROCEDURE check_rider_covering();