DROP TABLE IF EXISTS shifts CASCADE;
DROP TABLE IF EXISTS weekly_work_schedules CASCADE;
DROP TABLE IF EXISTS wws_works CASCADE;

CREATE TABLE weekly_work_schedules
(
  wws_id SERIAL,
  starting_date DATE NOT NULL,
  ending_date DATE NOT NULL,
  CONSTRAINT seven_consecutive_days CHECK (ending_date - starting_date = 7),
  PRIMARY KEY (wws_id)
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
  total_hours INTERVAL;
BEGIN
  WITH durations AS (
    SELECT ending_time - starting_time AS duration
    FROM weekly_work_schedules NATURAL JOIN wws_works NATURAL JOIN shifts
    WHERE wws_id = NEW.wws_id
  )
  SELECT sum(duration) INTO total_hours
  FROM durations;
  IF total_hours IS NULL OR total_hours < '10 hour' OR total_hours > '48 hour' THEN
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

CREATE OR REPLACE FUNCTION check_five_hour_shift() RETURNS TRIGGER
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

DROP TRIGGER IF EXISTS five_hour_shift ON wws_works CASCADE;
CREATE CONSTRAINT TRIGGER five_hour_shift
  AFTER INSERT ON wws_works
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  EXECUTE PROCEDURE check_five_hour_shift();

INSERT INTO weekly_work_schedules (starting_date, ending_date) VALUES ('2020-04-01', '2020-04-08');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '100000', '110000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '110000', '120000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '120000', '130000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '130000', '140000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '140000', '150000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '150000', '160000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '160000', '170000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '170000', '180000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '190000', '200000');
INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '200000', '210000');
INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 1);
INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 2);
INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 3);
INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 4);
INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 5);
INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 6);
INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 7);
INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 8);
INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 9);
INSERT INTO wws_works (wws_id, shift_id) VALUES (1, 10);