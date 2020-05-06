-- select all months from all orders
SELECT DISTINCT EXTRACT(YEAR) AS year, EXTRACT(MONTH) AS month
FROM Delivers D JOIN Orders O ON D.order_id = O.order_id;

-- rider order count, delivery time, number of ratings and average rating in month
SELECT rider_id, count(DISTINCT delivery_id) AS order_count, avg(completion_time-departure_time) AS delivery_time, count(rating) as no_rating, avg(rating) as avg_rating
FROM Delivers D JOIN Orders O ON D.order_id = O.order_id
WHERE EXTRACT(MONTH FROM O.created_at) = $1 AND EXTRACT(YEAR FROM O.created_at) = $2 AND O.status = 'completed'
GROUP BY rider_id;

-- find all riders who delivered
SELECT DISTINCT rider_id 
FROM Delivers D;

-- find respective hours worked in month
SELECT rider_id,
	CASE
		WHEN R.rider_id in (SELECT rider_id FROM part_time_riders PT) THEN
			(SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
			FROM PT_rider_works P JOIN (WWS_Contains C JOIN Shifts S ON C.shift_id = S.shift_id) ON C.wws_id = P.wws_id
			WHERE EXTRACT(MONTH FROM S.work_date) = $1 AND EXTRACT(YEAR FROM S.work_date) = $2 AND P.rider_id = R.rider_id
			GROUP BY rider_id)
		WHEN R.rider_id in (SELECT rider_id FROM full_time_riders FT) THEN
			(SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
			FROM FT_rider_works F JOIN (MWS_Contains C JOIN Shifts S ON C.shift_id = S.shift_id) ON C.mws_id = F.mws_id
			WHERE EXTRACT(MONTH FROM S.work_date) = $1 AND EXTRACT(YEAR FROM S.work_date) = $2 AND F.rider_id = R.rider_id
			GROUP BY rider_id)
		ELSE 0
	END AS hours
FROM riders R;

-- incomplete & not checked yet, find total pay received by riders in month
WITH rider_commission AS (
SELECT rider_id, sum(O.delivery_fee) AS commission
FROM Delivers D JOIN Orders O ON D.order_id = O.order_id AND O.status = 'completed'
WHERE EXTRACT(MONTH FROM O.created_at) = 4 AND EXTRACT(YEAR FROM O.created_at) = 2020
GROUP BY rider_id
),
rider_hours AS (
	SELECT rider_id,
	CASE
		WHEN R.rider_id in (SELECT rider_id FROM part_time_riders PT) THEN
			(SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
			FROM PT_rider_works P JOIN (WWS_Contains C JOIN Shifts S ON C.shift_id = S.shift_id) ON C.wws_id = P.wws_id
			WHERE EXTRACT(MONTH FROM S.work_date) = 4 AND EXTRACT(YEAR FROM S.work_date) = 2020 AND P.rider_id = R.rider_id
			GROUP BY rider_id)
		WHEN R.rider_id in (SELECT rider_id FROM full_time_riders FT) THEN
			(SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
			FROM FT_rider_works F JOIN (MWS_Contains C JOIN Shifts S ON C.shift_id = S.shift_id) ON C.mws_id = F.mws_id
			WHERE EXTRACT(MONTH FROM S.work_date) = 4 AND EXTRACT(YEAR FROM S.work_date) = 2020 AND F.rider_id = R.rider_id
			GROUP BY rider_id)
		ELSE 0
	END AS hours
FROM riders R
),
rider_pay AS (
SELECT rider_id,
	CASE
		WHEN R.rider_id in (SELECT rider_id FROM part_time_riders PT) THEN
			(SELECT salary_per_hour * COALESCE(hours, 0)
			FROM part_time_riders PT LEFT JOIN rider_hours H ON PT.rider_id = H.rider_id
			WHERE H.rider_id = R.rider_id)
		WHEN R.rider_id in (SELECT rider_id FROM full_time_riders FT) THEN
			(SELECT base_salary 
			FROM full_time_riders FT
			WHERE FT.rider_id = R.rider_id)
	END AS pay
FROM riders R),
rider_stats AS (
	SELECT rider_id, count(DISTINCT delivery_id) AS order_count, avg(completion_time-departure_time) AS delivery_time, count(rating) as no_rating, avg(rating) as avg_rating
	FROM Delivers D JOIN Orders O ON D.order_id = O.order_id
	WHERE EXTRACT(MONTH FROM O.created_at) = 4 AND EXTRACT(YEAR FROM O.created_at) = 2020 AND O.status = 'completed'
	GROUP BY rider_id
)
SELECT P.rider_id, COALESCE(commission, 0) + COALESCE(pay, 0) AS total_pay, COALESCE(hours, 0) AS hours_worked, COALESCE(order_count, 0) AS order_count, delivery_time, no_rating, avg_rating
FROM rider_hours H JOIN (rider_pay P LEFT JOIN (rider_commission C JOIN rider_stats S ON C.rider_id = S.rider_id) ON C.rider_id = P.rider_id) ON P.rider_id = H.rider_id;
