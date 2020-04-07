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