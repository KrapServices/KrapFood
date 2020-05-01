-- select all months from all orders
SELECT DISTINCT EXTRACT(YEAR) AS year, EXTRACT(MONTH) AS month
FROM Delivers D JOIN Orders O ON D.order_id = O.order_id;

-- rider order count, delivery time, number of ratings and average rating in month
WITH rider_order_stats AS (
SELECT rider_id, count(DISTINCT delivery_id) AS order_count, avg(completion_time-departure_time) AS delivery_time, count(rating) as no_rating, avg(rating) as avg_rating
FROM Delivers D JOIN Orders O ON D.order_id = O.order_id
WHERE EXTRACT(MONTH FROM O.created_at) = $1 AND EXTRACT(YEAR FROM O.created_at) = $2
GROUP BY rider_id
)

-- find all riders who delivered
SELECT DISTINCT rider_id 
FROM Delivers D;

-- find respective hours worked in month
SELECT rider_id,
	CASE
		WHEN R.rider_id in (SELECT rider_id FROM part_time_riders PT) THEN
			(SELECT SUM(EXTRACT(HOUR from ending_time - starting_time)) AS hours
			FROM PT_rider_works P JOIN (WWS_Contains C JOIN Shifts S ON C.shift_id = S.shift_id) ON C.wws_id = P.wws_id
			WHERE EXTRACT(MONTH FROM S.work_date) = $1 AND EXTRACT(YEAR FROM S.work_date) = $2 AND P.rider_id = R.rider_id
			GROUP BY rider_id)
		WHEN R.rider_id in (SELECT rider_id FROM full_time_riders FT) THEN
			(SELECT SUM(EXTRACT(HOUR from ending_time - starting_time)) AS hours
			FROM FT_rider_works F JOIN (MWS_Contains C JOIN Shifts S ON C.shift_id = S.shift_id) ON C.mws_id = F.mws_id
			WHERE EXTRACT(MONTH FROM S.work_date) = $1 AND EXTRACT(YEAR FROM S.work_date) = $2 AND F.rider_id = R.rider_id
			GROUP BY rider_id)
		ELSE 0
	END AS hours
FROM riders R;

-- incomplete & not checked yet, find total pay received by riders in month
WITH rider_commission AS (
SELECT rider_id, sum(delivery_fee) AS commission
FROM Delivers D JOIN Orders O ON D.order_id = O.order_id
WHERE EXTRACT(MONTH FROM O.created_at) = $1 AND EXTRACT(YEAR FROM O.created_at) = $2
GROUP BY rider_id
),
rider_pay AS (
SELECT rider_id,
	CASE
		WHEN R.rider_id in (SELECT rider_id FROM part_time_riders PT) THEN
			(SELECT salary_per_hour * SUM(EXTRACT(HOUR from ending_time - starting_time))
			FROM part_time_riders PT JOIN (PT_rider_works P JOIN (WWS_Contains C JOIN Shifts S ON C.shift_id = S.shift_id) ON C.wws_id = P.wws_id) ON PT.rider_id = P.rider_id
			WHERE EXTRACT(MONTH FROM S.work_date) = 4 AND EXTRACT(YEAR FROM S.work_date) = 2020 AND P.rider_id = R.rider_id
			GROUP BY rider_id)
		WHEN R.rider_id in (SELECT rider_id FROM full_time_riders FT) THEN
			(SELECT base_salary 
			FROM full_time_riders FT
			WHERE FT.rider_id = R.rider_id)
	END AS pay
FROM riders R)
SELECT rider_id, COALESCE(commission+pay, 0)
FROM rider_commission C JOIN rider_pay P ON C.rider_id = P.rider_id;

