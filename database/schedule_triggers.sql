CREATE OR REPLACE FUNCTION check_shift_within_wws() RETURNS TRIGGER
  AS $$
DECLARE
  starting_date DATE;
  ending_date DATE;
  work_date DATE;
BEGIN
  SELECT W.starting_date, W.ending_date INTO starting_date, ending_date
  FROM weekly_work_schedules W
  WHERE NEW.wws_id = W.wws_id;
  SELECT S.work_date INTO work_date
  FROM shifts S
  WHERE NEW.shift_id = S.shift_id;
  IF work_date < starting_date OR work_date > ending_date THEN
    RAISE exception '% is not within % and %', work_date, starting_date, ending_date;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS shift_within_wws ON wws_contains CASCADE;
CREATE TRIGGER shift_within_wws
  AFTER INSERT ON wws_contains
  FOR EACH ROW
  EXECUTE PROCEDURE check_shift_within_wws();

CREATE OR REPLACE FUNCTION check_wws_duplicate_shift() RETURNS TRIGGER
  AS $$
DECLARE
  clashing_shift_id INTEGER;
BEGIN
  SELECT shift_id INTO clashing_shift_id
  FROM wws_contains NATURAL JOIN shifts
  WHERE NEW.wws_id = wws_id
  AND NEW.shift_id <> shift_id
  AND (work_date, starting_time, ending_time) IN (
    SELECT work_date, starting_time, ending_time
    FROM shifts
    WHERE shift_id = NEW.shift_id
  );
  IF clashing_shift_id IS NOT NULL THEN
    RAISE exception 'Shift % clashes with shift %', NEW.shift_id, clashing_shift_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS wws_duplicate_shift ON wws_contains CASCADE;
CREATE TRIGGER wws_duplicate_shift
  AFTER INSERT ON wws_contains
  FOR EACH ROW
  EXECUTE PROCEDURE check_wws_duplicate_shift();

CREATE OR REPLACE FUNCTION check_wws_total_hours() RETURNS TRIGGER
  AS $$
DECLARE
  total_hours INTEGER;
BEGIN
  SELECT count(shift_id) INTO total_hours
  FROM wws_contains
  WHERE wws_id = NEW.wws_id;
  IF total_hours < 10 OR total_hours > 48 THEN
    RAISE exception 'Weekly work schedule % total hours must be between 10 and 48', NEW.wws_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS wws_total_hours ON weekly_work_schedules CASCADE;
CREATE CONSTRAINT TRIGGER wws_total_hours
  AFTER INSERT ON weekly_work_schedules
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  EXECUTE PROCEDURE check_wws_total_hours();

CREATE OR REPLACE FUNCTION check_wws_five_hour_shift() RETURNS TRIGGER
  AS $$
DECLARE
  work_date DATE;
  time_of_five_hour_shift TIME;
BEGIN
  SELECT S1.work_date, S1.starting_time INTO work_date, time_of_five_hour_shift
  FROM wws_contains NATURAL JOIN shifts S1
  WHERE EXISTS (
    SELECT 1
    FROM wws_contains NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '1 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM wws_contains NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '2 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM wws_contains NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '3 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM wws_contains NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '4 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM wws_contains NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '5 hour'
    AND S2.work_date = S1.work_date
  );
  IF work_date IS NOT NULL AND time_of_five_hour_shift IS NOT NULL THEN
    RAISE exception '% has a five hour shift at %', work_date, time_of_five_hour_shift;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS wws_five_hour_shift ON wws_contains CASCADE;
CREATE CONSTRAINT TRIGGER wws_five_hour_shift
  AFTER INSERT ON wws_contains
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  EXECUTE PROCEDURE check_wws_five_hour_shift();

CREATE OR REPLACE FUNCTION check_shift_within_mws() RETURNS TRIGGER
  AS $$
DECLARE
  starting_date DATE;
  ending_date DATE;
  work_date DATE;
BEGIN
  SELECT M.starting_date, M.ending_date INTO starting_date, ending_date
  FROM monthly_work_schedules M
  WHERE NEW.mws_id = M.mws_id;
  SELECT S.work_date INTO work_date
  FROM shifts S
  WHERE NEW.shift_id = S.shift_id;
  IF work_date < starting_date OR work_date > ending_date THEN
    RAISE exception '% is not within % and %', work_date, starting_date, ending_date;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS shift_within_mws ON mws_contains CASCADE;
CREATE TRIGGER shift_within_mws
  AFTER INSERT ON mws_contains
  FOR EACH ROW
  EXECUTE PROCEDURE check_shift_within_mws();

CREATE OR REPLACE FUNCTION check_mws_equivalent_weeks() RETURNS TRIGGER
  AS $$
DECLARE
  invalid_mws_id INTEGER;
  first_week_count INTEGER;
  second_week_count INTEGER;
  third_week_count INTEGER;
  fourth_week_count INTEGER;
BEGIN
  WITH first_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_contains NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date <= starting_date + INTERVAL '6 day'
  ), second_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_contains NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date >= starting_date + INTERVAL '7 day'
    AND work_date <= starting_date + INTERVAL '13 day'
  ), third_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_contains NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date >= starting_date + INTERVAL '14 day'
    AND work_date <= starting_date + INTERVAL '20 day'
  ), fourth_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_contains NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date >= starting_date + INTERVAL '21 day'
    AND work_date <= starting_date + INTERVAL '27 day'
  )
  SELECT mws_id INTO invalid_mws_id
  FROM first_week_shifts F
  WHERE NOT EXISTS (
    SELECT 1
    FROM second_week_shifts S
    WHERE S.work_date = F.work_date + INTERVAL '7 day'
    AND S.starting_time = F.starting_time
    AND S.ending_time = F.ending_time
  ) OR NOT EXISTS (
    SELECT 1
    FROM third_week_shifts T
    WHERE T.work_date = F.work_date + INTERVAL '14 day'
    AND T.starting_time = F.starting_time
    AND T.ending_time = F.ending_time
  ) OR NOT EXISTS (
    SELECT 1
    FROM fourth_week_shifts A
    WHERE A.work_date = F.work_date + INTERVAL '21 day'
    AND A.starting_time = F.starting_time
    AND A.ending_time = F.ending_time
  );
  WITH first_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_contains NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date <= starting_date + INTERVAL '6 day'
  )
  SELECT count(shift_id) INTO first_week_count
  FROM first_week_shifts;
  WITH second_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_contains NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date >= starting_date + INTERVAL '7 day'
    AND work_date <= starting_date + INTERVAL '13 day'
  )
  SELECT count(shift_id) INTO second_week_count
  FROM second_week_shifts;
  WITH third_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_contains NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date >= starting_date + INTERVAL '14 day'
    AND work_date <= starting_date + INTERVAL '20 day'
  )
  SELECT count(shift_id) INTO third_week_count
  FROM third_week_shifts;
  WITH fourth_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_contains NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date >= starting_date + INTERVAL '21 day'
    AND work_date <= starting_date + INTERVAL '27 day'
  )
  SELECT count(shift_id) INTO fourth_week_count
  FROM fourth_week_shifts;
  IF first_week_count <> second_week_count OR first_week_count <> third_week_count OR first_week_count <> fourth_week_count OR invalid_mws_id IS NOT NULL THEN
    RAISE exception 'Monthly schedule % does not have equivalent work weeks', NEW.mws_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mws_equivalent_weeks ON monthly_work_schedules CASCADE;
CREATE CONSTRAINT TRIGGER mws_equivalent_weeks
  AFTER INSERT ON monthly_work_schedules
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  EXECUTE PROCEDURE check_mws_equivalent_weeks();

CREATE OR REPLACE FUNCTION check_mws_duplicate_shift() RETURNS TRIGGER
  AS $$
DECLARE
  clashing_shift_id INTEGER;
BEGIN
  SELECT shift_id INTO clashing_shift_id
  FROM mws_contains NATURAL JOIN shifts
  WHERE NEW.mws_id = mws_id
  AND NEW.shift_id <> shift_id
  AND (work_date, starting_time, ending_time) IN (
    SELECT work_date, starting_time, ending_time
    FROM shifts
    WHERE shift_id = NEW.shift_id
  );
  IF clashing_shift_id IS NOT NULL THEN
    RAISE exception 'Shift % clashes with shift %', NEW.shift_id, clashing_shift_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mws_duplicate_shift ON mws_contains CASCADE;
CREATE TRIGGER mws_duplicate_shift
  AFTER INSERT ON mws_contains
  FOR EACH ROW
  EXECUTE PROCEDURE check_mws_duplicate_shift();

CREATE OR REPLACE FUNCTION check_mws_week_consecutive_five() RETURNS TRIGGER
  AS $$
DECLARE
  invalid INTEGER;
BEGIN
  WITH first_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_contains NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date <= starting_date + INTERVAL '6 day'
  )
  SELECT 1 INTO invalid
  FROM (SELECT 1) AS one
  WHERE NOT EXISTS (
    SELECT 1
    FROM first_week_shifts
    WHERE work_date - (SELECT min(work_date) FROM first_week_shifts) = 1
  ) OR NOT EXISTS (
    SELECT 1
    FROM first_week_shifts
    WHERE work_date - (SELECT min(work_date) FROM first_week_shifts) = 2
  ) OR NOT EXISTS (
    SELECT 1
    FROM first_week_shifts
    WHERE work_date - (SELECT min(work_date) FROM first_week_shifts) = 3
  ) OR NOT EXISTS (
    SELECT 1
    FROM first_week_shifts
    WHERE work_date - (SELECT min(work_date) FROM first_week_shifts) = 4
  ) OR EXISTS (
    SELECT 1
    FROM first_week_shifts
    WHERE work_date - (SELECT min(work_date) FROM first_week_shifts) >= 5
  );
  IF invalid IS NOT NULL THEN
    RAISE exception 'Monthly schedule % does not have weeks of 5 consecutive days', NEW.mws_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mws_week_consecutive_five ON monthly_work_schedules CASCADE;
CREATE CONSTRAINT TRIGGER mws_week_consecutive_five
  AFTER INSERT ON monthly_work_schedules
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  EXECUTE PROCEDURE check_mws_week_consecutive_five();

CREATE OR REPLACE FUNCTION check_mws_five_hour_shift() RETURNS TRIGGER
  AS $$
DECLARE
  work_date DATE;
  time_of_five_hour_shift TIME;
BEGIN
  SELECT S1.work_date, S1.starting_time INTO work_date, time_of_five_hour_shift
  FROM mws_contains NATURAL JOIN shifts S1
  WHERE EXISTS (
    SELECT 1
    FROM mws_contains NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '1 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM mws_contains NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '2 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM mws_contains NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '3 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM mws_contains NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '4 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM mws_contains NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '5 hour'
    AND S2.work_date = S1.work_date
  );
  IF work_date IS NOT NULL AND time_of_five_hour_shift IS NOT NULL THEN
    RAISE exception '% has a five hour shift at %', work_date, time_of_five_hour_shift;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mws_five_hour_shift ON mws_contains CASCADE;
CREATE CONSTRAINT TRIGGER mws_five_hour_shift
  AFTER INSERT ON mws_contains
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  EXECUTE PROCEDURE check_mws_five_hour_shift();

CREATE OR REPLACE FUNCTION check_mws_allowed_workday() RETURNS TRIGGER
  AS $$
DECLARE
  invalid_work_date DATE;
BEGIN
  SELECT work_date INTO invalid_work_date
  FROM mws_contains NATURAL JOIN shifts
  WHERE mws_id = NEW.mws_id
  GROUP BY work_date
  HAVING count(shift_id) <> 8
  OR max(ending_time) - min(starting_time) <> '9 hour';
  IF invalid_work_date IS NOT NULL THEN
    RAISE exception '% does not comply with full-time workday requirements', invalid_work_date;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mws_allowed_workday ON monthly_work_schedules CASCADE;
CREATE CONSTRAINT TRIGGER mws_allowed_workday
  AFTER INSERT ON monthly_work_schedules
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  EXECUTE PROCEDURE check_mws_allowed_workday();

CREATE OR REPLACE FUNCTION check_wws_overlap() RETURNS TRIGGER
  AS $$
DECLARE
  new_starting_date DATE;
  new_ending_date DATE;
  clashing_wws_id INTEGER;
BEGIN
  SELECT starting_date, ending_date INTO new_starting_date, new_ending_date
  FROM weekly_work_schedules
  WHERE wws_id = NEW.wws_id;
  SELECT wws_id INTO clashing_wws_id
  FROM pt_rider_works NATURAL JOIN weekly_work_schedules
  WHERE wws_id <> NEW.wws_id
  AND rider_id = NEW.rider_id
  AND (starting_date, ending_date) OVERLAPS (new_starting_date, new_ending_date);
  IF clashing_wws_id IS NOT NULL THEN
    RAISE exception 'Weekly schedule % clashes with weekly schedule % for rider %', NEW.wws_id, clashing_wws_id, NEW.rider_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS wws_overlap_trigger ON pt_rider_works CASCADE;
CREATE TRIGGER wws_overlap_trigger
  AFTER INSERT ON pt_rider_works
  FOR EACH ROW
  EXECUTE PROCEDURE check_wws_overlap();

CREATE OR REPLACE FUNCTION check_mws_overlap() RETURNS TRIGGER
  AS $$
DECLARE
  new_starting_date DATE;
  new_ending_date DATE;
  clashing_mws_id INTEGER;
BEGIN
  SELECT starting_date, ending_date INTO new_starting_date, new_ending_date
  FROM monthly_work_schedules
  WHERE mws_id = NEW.mws_id;
  SELECT mws_id INTO clashing_mws_id
  FROM ft_rider_works NATURAL JOIN monthly_work_schedules
  WHERE mws_id <> NEW.mws_id
  AND rider_id = NEW.rider_id
  AND (starting_date, ending_date) OVERLAPS (new_starting_date, new_ending_date);
  IF clashing_mws_id IS NOT NULL THEN
    RAISE exception 'Weekly schedule % clashes with weekly schedule % for rider %', NEW.mws_id, clashing_mws_id, NEW.rider_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mws_overlap_trigger ON ft_rider_works CASCADE;
CREATE TRIGGER mws_overlap_trigger
  AFTER INSERT ON ft_rider_works
  FOR EACH ROW
  EXECUTE PROCEDURE check_mws_overlap();