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

CREATE TABLE wws_contains
(
  wws_id INTEGER,
  shift_id INTEGER,
  PRIMARY KEY (wws_id, shift_id),
  FOREIGN KEY (wws_id) REFERENCES weekly_work_schedules (wws_id),
  FOREIGN KEY (shift_id) REFERENCES shifts (shift_id)
);

CREATE TABLE mws_contains
(
  mws_id INTEGER,
  shift_id INTEGER,
  PRIMARY KEY (mws_id, shift_id),
  FOREIGN KEY (mws_id) REFERENCES monthly_work_schedules (mws_id),
  FOREIGN KEY (shift_id) REFERENCES shifts (shift_id)
);

CREATE TABLE pt_rider_works
(
  rider_id INTEGER,
  wws_id INTEGER,
  PRIMARY KEY (rider_id, wws_id),
  FOREIGN KEY (rider_id) REFERENCES part_time_riders (rider_id) ON DELETE CASCADE,
  FOREIGN KEY (wws_id) REFERENCES weekly_work_schedules (wws_id)
);

CREATE TABLE ft_rider_works
(
  rider_id INTEGER,
  mws_id INTEGER,
  PRIMARY KEY (rider_id, mws_id),
  FOREIGN KEY (rider_id) REFERENCES full_time_riders (rider_id) ON DELETE CASCADE,
  FOREIGN KEY (mws_id) REFERENCES monthly_work_schedules (mws_id)
);