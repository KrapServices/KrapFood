DROP TABLE IF EXISTS shifts CASCADE;
DROP TABLE IF EXISTS weekly_work_schedules CASCADE;
DROP TABLE IF EXISTS wws_works CASCADE;
DROP TABLE IF EXISTS monthly_work_schedules CASCADE;
DROP TABLE IF EXISTS mws_works CASCADE;

CREATE TABLE weekly_work_schedules
(
  wws_id SERIAL,
  starting_date DATE NOT NULL,
  ending_date DATE NOT NULL,
  CONSTRAINT seven_consecutive_days CHECK (ending_date - starting_date = 6),
  PRIMARY KEY (wws_id)
);

CREATE TABLE monthly_work_schedules
(
  mws_id SERIAL,
  starting_date DATE NOT NULL,
  ending_date DATE NOT NULL,
  CONSTRAINT twenty_eight_consecutive_days CHECK (ending_date - starting_date = 27),
  PRIMARY KEY (mws_id)
);

CREATE TABLE shifts
(
  shift_id SERIAL,
  work_date DATE NOT NULL,
  starting_time TIME NOT NULL,
  ending_time TIME NOT NULL,
  CONSTRAINT start_at_1000 CHECK (starting_time - '100000' >= '0'),
  CONSTRAINT end_at_2200 CHECK (ending_time - '220000' <= '0'),
  CONSTRAINT start_end_on_hour CHECK (
    EXTRACT (minute FROM starting_time) = '00' AND EXTRACT (second FROM starting_time) = '00'
    AND EXTRACT (minute FROM ending_time) = '00' AND EXTRACT (second FROM ending_time) = '00'
  ),
  CONSTRAINT one_hour_shift CHECK (ending_time - starting_time = INTERVAL '1 hour'),
  PRIMARY KEY (shift_id)
);

CREATE TABLE wws_works
(
  wws_id INTEGER,
  shift_id INTEGER,
  PRIMARY KEY (wws_id, shift_id),
  FOREIGN KEY (wws_id) REFERENCES weekly_work_schedules (wws_id),
  FOREIGN KEY (shift_id) REFERENCES shifts (shift_id)
);

CREATE TABLE mws_works
(
  mws_id INTEGER,
  shift_id INTEGER,
  PRIMARY KEY (mws_id, shift_id),
  FOREIGN KEY (mws_id) REFERENCES monthly_work_schedules (mws_id),
  FOREIGN KEY (shift_id) REFERENCES shifts (shift_id)
);

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

DROP TRIGGER IF EXISTS shift_within_wws ON wws_works CASCADE;
CREATE TRIGGER shift_within_wws
  AFTER INSERT ON wws_works
  FOR EACH ROW
  EXECUTE PROCEDURE check_shift_within_wws();

CREATE OR REPLACE FUNCTION check_wws_duplicate_shift() RETURNS TRIGGER
  AS $$
DECLARE
  clashing_shift_id INTEGER;
BEGIN
  SELECT shift_id INTO clashing_shift_id
  FROM wws_works NATURAL JOIN shifts
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

DROP TRIGGER IF EXISTS wws_duplicate_shift ON wws_works CASCADE;
CREATE TRIGGER wws_duplicate_shift
  AFTER INSERT ON wws_works
  FOR EACH ROW
  EXECUTE PROCEDURE check_wws_duplicate_shift();

CREATE OR REPLACE FUNCTION check_wws_total_hours() RETURNS TRIGGER
  AS $$
DECLARE
  total_hours INTEGER;
BEGIN
  SELECT count(shift_id) INTO total_hours
  FROM wws_works
  WHERE wws_id = NEW.wws_id;
  IF total_hours < 10 OR total_hours > 48 THEN
    RAISE exception 'Weekly work schedule total hours must be between 10 and 48';
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
  FROM wws_works NATURAL JOIN shifts S1
  WHERE EXISTS (
    SELECT 1
    FROM wws_works NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '1 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM wws_works NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '2 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM wws_works NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '3 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM wws_works NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '4 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM wws_works NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '5 hour'
    AND S2.work_date = S1.work_date
  );
  IF work_date IS NOT NULL AND time_of_five_hour_shift IS NOT NULL THEN
    RAISE exception '% has a five hour shift at %', work_date, time_of_five_hour_shift;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS wws_five_hour_shift ON wws_works CASCADE;
CREATE CONSTRAINT TRIGGER wws_five_hour_shift
  AFTER INSERT ON wws_works
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

DROP TRIGGER IF EXISTS shift_within_mws ON mws_works CASCADE;
CREATE TRIGGER shift_within_mws
  AFTER INSERT ON mws_works
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
    FROM monthly_work_schedules NATURAL JOIN mws_works NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date <= starting_date + INTERVAL '6 day'
  ), second_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_works NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date >= starting_date + INTERVAL '7 day'
    AND work_date <= starting_date + INTERVAL '13 day'
  ), third_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_works NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date >= starting_date + INTERVAL '14 day'
    AND work_date <= starting_date + INTERVAL '20 day'
  ), fourth_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_works NATURAL JOIN shifts
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
    FROM monthly_work_schedules NATURAL JOIN mws_works NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date <= starting_date + INTERVAL '6 day'
  )
  SELECT count(shift_id) INTO first_week_count
  FROM first_week_shifts;
  WITH second_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_works NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date >= starting_date + INTERVAL '7 day'
    AND work_date <= starting_date + INTERVAL '13 day'
  )
  SELECT count(shift_id) INTO second_week_count
  FROM second_week_shifts;
  WITH third_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_works NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date >= starting_date + INTERVAL '14 day'
    AND work_date <= starting_date + INTERVAL '20 day'
  )
  SELECT count(shift_id) INTO third_week_count
  FROM third_week_shifts;
  WITH fourth_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_works NATURAL JOIN shifts
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
  FROM mws_works NATURAL JOIN shifts
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

DROP TRIGGER IF EXISTS mws_duplicate_shift ON mws_works CASCADE;
CREATE TRIGGER mws_duplicate_shift
  AFTER INSERT ON mws_works
  FOR EACH ROW
  EXECUTE PROCEDURE check_mws_duplicate_shift();

CREATE OR REPLACE FUNCTION check_mws_week_consecutive_five() RETURNS TRIGGER
  AS $$
DECLARE
  invalid INTEGER;
BEGIN
  WITH first_week_shifts AS (
    SELECT *
    FROM monthly_work_schedules NATURAL JOIN mws_works NATURAL JOIN shifts
    WHERE mws_id = NEW.mws_id
    AND work_date <= starting_date + INTERVAL '6 day'
  )
  SELECT 1 INTO invalid
  FROM first_week_shifts F1
  WHERE EXISTS (
    SELECT 1
    FROM first_week_shifts F2
    WHERE F2.work_date - F1.work_date >= 5
  );
  IF invalid IS NOT NULL THEN
    RAISE exception 'Monthly schedule % does not have weeks of 5 consecutive days', NEW.mws_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION check_mws_five_hour_shift() RETURNS TRIGGER
  AS $$
DECLARE
  work_date DATE;
  time_of_five_hour_shift TIME;
BEGIN
  SELECT S1.work_date, S1.starting_time INTO work_date, time_of_five_hour_shift
  FROM mws_works NATURAL JOIN shifts S1
  WHERE EXISTS (
    SELECT 1
    FROM mws_works NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '1 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM mws_works NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '2 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM mws_works NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '3 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM mws_works NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '4 hour'
    AND S2.work_date = S1.work_date
  ) AND EXISTS (
    SELECT 1
    FROM mws_works NATURAL JOIN shifts S2
    WHERE S2.ending_time = S1.starting_time + INTERVAL '5 hour'
    AND S2.work_date = S1.work_date
  );
  IF work_date IS NOT NULL AND time_of_five_hour_shift IS NOT NULL THEN
    RAISE exception '% has a five hour shift at %', work_date, time_of_five_hour_shift;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS mws_five_hour_shift ON mws_works CASCADE;
CREATE CONSTRAINT TRIGGER mws_five_hour_shift
  AFTER INSERT ON mws_works
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  EXECUTE PROCEDURE check_mws_five_hour_shift();

DROP TRIGGER IF EXISTS mws_week_consecutive_five ON monthly_work_schedules CASCADE;
CREATE CONSTRAINT TRIGGER mws_week_consecutive_five
  AFTER INSERT ON monthly_work_schedules
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  EXECUTE PROCEDURE check_mws_week_consecutive_five();

CREATE OR REPLACE FUNCTION check_mws_allowed_workday() RETURNS TRIGGER
  AS $$
DECLARE
  invalid_work_date DATE;
BEGIN
  SELECT work_date INTO invalid_work_date
  FROM mws_works NATURAL JOIN shifts
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

-- INSERT INTO weekly_work_schedules (starting_date, ending_date) VALUES ('2020-04-01', '2020-04-07');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '100000', '110000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '150000', '160000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '200000', '210000');
-- INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 1);
-- INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 2);
-- INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 3);
-- INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 4);
-- INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 5);
-- INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 6);
-- INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 7);
-- INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 8);
-- INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 9);
-- INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 10);

-- INSERT INTO monthly_work_schedules (starting_date, ending_date) VALUES ('2020-04-01', '2020-04-28');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '190000', '200000');
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 11);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 12);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 13);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 14);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 15);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 16);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 17);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 18);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 19);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 20);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 21);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 22);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 23);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 24);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 25);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 26);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 27);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 28);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 29);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 30);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 31);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 32);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 33);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 34);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 35);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 36);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 37);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 38);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 39);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 40);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 41);
-- INSERT INTO mws_works (mws_id, shift_id) VALUES (1, 42);