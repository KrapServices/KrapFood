WITH rider_commission AS (
        SELECT d.rider_id, sum(o.delivery_fee) AS commission
        FROM delivers d JOIN orders o on d.order_id = o.order_id and o.status = 'completed'
        WHERE DATE(o.created_at) >= DATE('12/04/2019') OR DATE(o.created_at) <= DATE('12/01/2020') 
        GROUP BY d.rider_id
      ), 
      rider_hours AS (
        SELECT rider_id,
        CASE 
          WHEN rider_id IN (SELECT rider_id FROM part_time_riders PT) THEN 
            (SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
            FROM PT_rider_works p JOIN (wws_contains c JOIN shifts s on c.shift_id = s.shift_id) ON c.wws_id = p.wws_id
            WHERE DATE(s.work_date) >= DATE('12/04/2019') OR DATE(s.work_date) <= DATE('12/01/2019'))
          WHEN rider_id in (SELECT rider_id FROM full_time_riders FT) THEN
            (SELECT SUM(EXTRACT(HOUR from ending_time - starting_time))
            FROM FT_rider_works f JOIN (mws_contains c JOIN shifts s on c.shift_id = s.shift_id) ON c.mws_id = f.mws_id
            WHERE DATE(s.work_date) >= DATE('12/04/2019') OR DATE(s.work_date) <= DATE('12/01/2019'))
        END AS hours 
        FROM riders
      ),
      order_count AS (
        SELECT d.rider_id, COUNT(d.order_id) AS total_orders
        FROM delivers d, orders o
        WHERE o.order_id = d.order_id
        AND (DATE(o.created_at) >= DATE('12/04/2019') OR DATE(o.created_at) <= DATE('12/01/2019')) 
        GROUP BY d.rider_id
      )
      SELECT d.rider_id, rh.hours AS total_hours, oc.total_orders AS total_orders, rc.commission + 
      CASE 
        WHEN d.rider_id IN (SELECT rider_id FROM part_time_riders) THEN
          (SELECT PT.salary_per_hour * rh.hours
           FROM part_time_riders PT, rider_hours rh)
        WHEN d.rider_id IN (SELECT rider_id FROM full_time_riders) THEN
        (SELECT ft.base_salary
        FROM full_time_riders ft)
      END AS rider_pay
      FROM ((delivers d JOIN rider_hours rh ON d.rider_id = rh.rider_id) JOIN order_count oc ON oc.rider_id = rh.rider_id) JOIN rider_commission rc ON rc.rider_id = rh.rider_id
      WHERE d.rider_id = 1