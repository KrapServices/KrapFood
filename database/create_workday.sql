DROP TABLE IF EXISTS shifts CASCADE;
DROP TABLE IF EXISTS work_days CASCADE;
DROP TABLE IF EXISTS work_day_contains CASCADE;
DROP TABLE IF EXISTS work_weeks CASCADE;

CREATE TABLE allowed_shifts
(
  start_time TIME,
  end_time TIME,
  PRIMARY KEY (start_time, end_time)
);

INSERT INTO allowed_shifts (start_time, end_time) VALUES
('1000', '1100'),
('1100', '1200'),
('1200', '1300'),
('1300', '1400'),
('1400', '1500'),
('1500', '1600'),
('1600', '1700'),
('1700', '1800'),
('1800', '1900'),
('1900', '2000'),
('2000', '2100'),
('2100', '2200');

CREATE TABLE work_shifts
(
  shift_id SERIAL,
  work_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  PRIMARY KEY (shift_id),
  FOREIGN KEY (start_time, end_time) REFERENCES allowed_shifts (start_time, end_time);
)

CREATE TABLE work_weeks
(
  week_id SERIAL,
  PRIMARY KEY (week_id)
);

CREATE TABLE work_days
(
  day_id SERIAL,
  week_id INTEGER NOT NULL,
  work_date DATE NOT NULL,
  PRIMARY KEY (day_id),
  FOREIGN KEY (week_id) REFERENCES work_weeks (week_id)
);

CREATE TABLE work_day_contains
(
  day_id INTEGER,
  start_time TIME,
  end_time TIME,
  PRIMARY KEY (day_id, start_time, end_time),
  FOREIGN KEY (day_id) REFERENCES work_days (day_id),
  FOREIGN KEY (start_time, end_time) REFERENCES shifts (start_time, end_time)
);

CREATE OR REPLACE FUNCTION check_shift_duration() RETURNS TRIGGER
  AS $$
DECLARE
  day_with_insufficient_break INTEGER;
BEGIN
  SELECT D1.day_id INTO day_with_insufficient_break
  FROM work_day_contains D1
  WHERE EXISTS (
    SELECT 1
    FROM work_day_contains D2
    WHERE D1.end_time + INTERVAL '1 hour' = D2.start_time
  ) AND EXISTS (
    SELECT 1
    FROM work_day_contains D2
    WHERE D1.end_time + INTERVAL '2 hour' = D2.start_time
  ) AND EXISTS (
    SELECT 1
    FROM work_day_contains D2
    WHERE D1.end_time + INTERVAL '3 hour' = D2.start_time
  ) AND EXISTS (
    SELECT 1
    FROM work_day_contains D2
    WHERE D1.end_time + INTERVAL '4 hour' = D2.start_time
  ) AND EXISTS (
    SELECT 1
    FROM work_day_contains D2
    WHERE D1.end_time + INTERVAL '5 hour' = D2.start_time
  );
  IF day_with_insufficient_break IS NOT NULL THEN
    RAISE exception 'Workday % has a shift longer than 4 hours.', day_with_insufficient_break;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS check_shift_duration_trigger ON work_day_contains CASCADE;
CREATE CONSTRAINT TRIGGER check_shift_duration_trigger
  AFTER INSERT ON work_day_contains
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  EXECUTE PROCEDURE check_shift_duration();

CREATE OR REPLACE FUNCTION check_day_belongs_to_week() RETURNS TRIGGER
  AS $$
DECLARE
  clashing_date DATE;
BEGIN
  SELECT day_id INTO clashing_date
  FROM work_days
  WHERE NEW.week_id = week_id
  AND (NEW.work_date - work_date) > INTERVAL '7 day'
  OR (work_date - NEW.work_date) > INTERVAL '7 day';
  IF clashing_date IS NOT NULL THEN
    RAISE exception '% clashes with %', NEW.day_id, day_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS check_day_belongs_to_week_trigger ON work_days CASCADE;
CREATE TRIGGER check_day_belongs_to_week_trigger
  AFTER INSERT ON work_days
  FOR EACH ROW
  EXECUTE PROCEDURE check_day_belongs_to_week();