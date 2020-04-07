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
  FOREIGN KEY (rider_id) REFERENCES part_time_riders (rider_id),
  FOREIGN KEY (wws_id) REFERENCES weekly_work_schedules (wws_id)
);

CREATE TABLE ft_rider_works
(
  rider_id INTEGER,
  mws_id INTEGER,
  PRIMARY KEY (rider_id, mws_id),
  FOREIGN KEY (rider_id) REFERENCES full_time_riders (rider_id),
  FOREIGN KEY (mws_id) REFERENCES monthly_work_schedules (mws_id)
);

-- Examples --

-- INSERT INTO users (email, password) VALUES ('abc@test.com', '123');
-- INSERT INTO riders (rider_id) VALUES (1);
-- INSERT INTO part_time_riders (rider_id, salary_per_hour) VALUES (1, 1.00);

-- INSERT INTO users (email, password) VALUES ('def@test.com', '123');
-- INSERT INTO riders (rider_id) VALUES (2);
-- INSERT INTO full_time_riders (rider_id, base_salary) VALUES (2, 1000.00);

-- INSERT INTO weekly_work_schedules (starting_date, ending_date) VALUES ('2020-04-01', '2020-04-07');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '100000', '110000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '150000', '160000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '100000', '110000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '110000', '120000');
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 1);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 2);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 3);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 4);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 5);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 6);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 7);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 8);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 9);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (1, 10);

-- INSERT INTO weekly_work_schedules (starting_date, ending_date) VALUES ('2020-04-05', '2020-04-11');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '100000', '110000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '150000', '160000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-06', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-07', '100000', '110000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-07', '110000', '120000');
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (2, 11);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (2, 12);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (2, 13);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (2, 14);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (2, 15);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (2, 16);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (2, 17);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (2, 18);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (2, 19);
-- INSERT INTO wws_contains (wws_id, shift_id) VALUES (2, 20);

-- INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (1, 1);
-- -- INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (1, 2);

-- INSERT INTO monthly_work_schedules (starting_date, ending_date) VALUES ('2020-04-01', '2020-04-28');

-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-01', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-02', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-03', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-04', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-05', '190000', '200000');

-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-08', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-09', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-10', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-11', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-12', '190000', '200000');

-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-15', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-16', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-17', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-18', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-19', '190000', '200000');

-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-22', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-23', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-24', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-25', '190000', '200000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '110000', '120000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '120000', '130000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '130000', '140000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '140000', '150000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '160000', '170000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '170000', '180000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '180000', '190000');
-- INSERT INTO shifts (work_date, starting_time, ending_time) VALUES ('2020-04-26', '190000', '200000');

-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 21);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 22);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 23);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 24);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 25);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 26);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 27);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 28);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 29);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 30);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 31);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 32);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 33);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 34);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 35);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 36);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 37);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 38);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 39);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 40);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 41);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 42);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 43);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 44);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 45);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 46);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 47);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 48);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 49);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 50);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 51);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 52);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 53);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 54);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 55);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 56);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 57);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 58);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 59);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 60);

-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 61);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 62);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 63);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 64);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 65);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 66);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 67);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 68);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 69);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 70);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 71);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 72);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 73);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 74);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 75);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 76);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 77);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 78);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 79);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 80);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 81);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 82);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 83);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 84);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 85);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 86);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 87);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 88);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 89);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 90);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 91);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 92);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 93);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 94);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 95);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 96);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 97);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 98);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 99);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 100);

-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 101);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 102);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 103);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 104);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 105);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 106);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 107);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 108);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 109);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 110);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 111);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 112);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 113);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 114);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 115);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 116);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 117);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 118);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 119);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 120);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 121);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 122);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 123);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 124);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 125);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 126);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 127);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 128);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 129);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 130);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 131);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 132);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 133);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 134);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 135);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 136);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 137);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 138);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 139);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 140);

-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 141);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 142);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 143);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 144);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 145);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 146);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 147);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 148);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 149);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 150);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 151);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 152);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 153);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 154);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 155);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 156);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 157);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 158);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 159);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 160);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 161);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 162);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 163);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 164);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 165);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 166);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 167);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 168);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 169);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 170);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 171);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 172);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 173);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 174);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 175);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 176);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 177);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 178);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 179);
-- INSERT INTO mws_contains (mws_id, shift_id) VALUES (1, 180);

-- INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (2, 1);