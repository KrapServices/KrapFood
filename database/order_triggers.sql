
CREATE OR REPLACE FUNCTION assign_delivery_order() RETURNS TRIGGER
    AS $$
DECLARE
    current_shift_id INTEGER;
    rider_selected_id INTEGER;
    order_count INTEGER;

BEGIN
    -- check schedule for available riders
    -- assign order to available riders
    SELECT distinct shift_id INTO current_shift_id
    FROM SHIFTS s
    WHERE DATE(NEW.created_at) = s.work_date 
    and (NEW.created_at::time >= s.starting_time 
        and NEW.created_at::time < (s.ending_time)); 
    
    with available_riders AS (
        SELECT distinct r.rider_id
        FROM mws_contains ms right join ft_rider_works r on ms.mws_id = r.mws_id 
        WHERE shift_id = current_shift_id
        UNION
        SELECT distinct p.rider_id 
        FROM wws_contains ws right join pt_rider_works p on ws.wws_id = p.wws_id
        WHERE shift_id = current_shift_id
    )
    SELECT distinct r.rider_id, COALESCE(count(distinct d.delivery_id), 0) as qty INTO rider_selected_id
    FROM (available_riders r left join delivers d on r.rider_id = d.rider_id and d.completion_time IS NULL)
    Group By r.rider_id      
    ORDER BY qty
    limit 1 ; -- find current rider with least number of orders
    IF rider_selected_id IS NULL THEN
        RAISE exception 'rider issue %', current_shift_id;
    END IF; 
    INSERT INTO delivers (rider_id, order_id, delivery_fee) VALUES (rider_selected_id, NEW.order_id, NEW.delivery_fee); -- assign rider
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS assign_delivery_order_trigger on Orders CASCADE;
CREATE TRIGGER assign_delivery_order_trigger 
    AFTER update of status
    on orders
    FOR EACH ROW
    WHEN (NEW.status = 'delivering')
    --assign rider
    EXECUTE PROCEDURE assign_delivery_order();


CREATE OR REPLACE FUNCTION complete_delivery_order_customer() RETURNS TRIGGER
    AS $$
BEGIN
    UPDATE customers c 
    SET order_count = order_count + 1, points = points + NEW.total_cost::INTEGER
    WHERE c.customer_id =  NEW.customer_id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS complete_delivery_order_customer_trigger ON orders CASCADE;
CREATE TRIGGER complete_delivery_order_customer_trigger 
    AFTER UPDATE OF status
    ON orders
    FOR EACH ROW
    WHEN (NEW.status = 'completed')
    EXECUTE PROCEDURE complete_delivery_order_customer();

CREATE OR REPLACE FUNCTION complete_delivery_order_rider() RETURNS TRIGGER
    AS $$
BEGIN
    UPDATE delivers d
    SET completion_time = current_timestamp
    WHERE d.order_id = NEW.order_id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS complete_delivery_order_rider_trigger ON Orders CASCADE;
CREATE TRIGGER complete_delivery_order_rider_trigger 
    AFTER UPDATE OF status
    ON orders
    FOR EACH ROW
    WHEN (NEW.status = 'completed')
    --assign rider
    EXECUTE PROCEDURE complete_delivery_order_rider();


--enforce all food in order from same restaurant
CREATE OR REPLACE FUNCTION same_restaurant() RETURNS TRIGGER 
    AS $$
DECLARE
    restaurant_id_1 INTEGER;
    restaurant_id_2 INTEGER;
BEGIN
    SELECT c1.restaurant_id, c2.restaurant_id into restaurant_id_1, restaurant_id_2
        FROM contain c1, contain c2
        WHERE c1.order_id = c2.order_id and EXISTS (
            SELECT 1
            WHERE c1.restaurant_id <> c2.restaurant_id
        );
    IF restaurant_id_1 IS NOT NULL and restaurant_id_2 IS NOT NULL THEN
        RAISE exception 'food cannot be from 2 different restuarants (% and %)', restaurant_id_1, restaurant_id_2;
    END IF;
    RETURN NULL;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS different_restaurants_trigger ON orders;
CREATE CONSTRAINT TRIGGER different_restaurants_trigger 
    AFTER INSERT ON orders
    DEFERRABLE INITIALLY DEFERRED
    FOR EACH ROW
    EXECUTE PROCEDURE same_restaurant();


-- check if available quantity for food is sufficient
CREATE OR REPLACE FUNCTION check_food_availability() RETURNS TRIGGER
    AS $$
DECLARE
    food_quantity INTEGER;
    food_availability BOOLEAN;
BEGIN
    SELECT F.daily_limit, F.availability INTO food_quantity, food_availability
    FROM foods F
    WHERE F.food_name = NEW.food_name AND F.restaurant_id = NEW.restaurant_id;
    IF (food_quantity < NEW.quantity AND food_availability = true) THEN
        RAISE exception 'insufficient %', NEW.food_name;
    ELSE
        RETURN NEW;
    END IF;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS check_availability_trigger ON Contain CASCADE;
CREATE TRIGGER check_availability_trigger
    BEFORE INSERT 
    ON Contain
    FOR EACH ROW
    EXECUTE FUNCTION check_food_availability();

-- dynamically update daily_limit of item
CREATE OR REPLACE FUNCTION update_food_quantity() RETURNS TRIGGER
    AS $$
BEGIN
    UPDATE foods f
    SET daily_limit = daily_limit - NEW.quantity::INTEGER
    WHERE f.restaurant_id = NEW.restaurant_id AND f.food_name = NEW.food_name;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_food_limit_trigger ON Contain CASCADE;
CREATE TRIGGER update_food_limit_trigger
    AFTER INSERT 
    ON Contain
    FOR EACH ROW
    EXECUTE FUNCTION update_food_quantity();


-- dynamically update availability of item
CREATE OR REPLACE FUNCTION update_food_availability() RETURNS TRIGGER
    AS $$
BEGIN
    IF (NEW.daily_limit = 0) THEN
        UPDATE foods
        SET availability = false
        WHERE restaurant_id = NEW.restaurant_id AND food_name = NEW.food_name;
    END IF;
    RETURN NULL;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_food_availability_trigger ON Foods CASCADE;
CREATE TRIGGER update_food_availability_trigger
    AFTER UPDATE OF daily_limit OR INSERT 
    ON Foods
    FOR EACH ROW
    EXECUTE FUNCTION update_food_availability();