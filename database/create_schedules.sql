CREATE TABLE workshift
(
  day_of_week INTEGER,
  CHECK (day_of_week >= 1 AND day_of_week <= 7),
  start_hour TIME,
  end_hour TIME,
  CONSTRAINT start_at_10am CHECK (start_hour - '1000' >= '0'),
  CONSTRAINT end_at_10pm CHECK (end_hour - '2200' <= '0'),
  CONSTRAINT min_one_hour_shift CHECK (end_hour - start_hour >= '1 hour'),
  CONSTRAINT max_four_hours_shift CHECK (end_hour - start_hour <= '4 hour'),
  PRIMARY KEY (day_of_week, start_hour, end_hour)
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