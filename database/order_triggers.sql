/*
CREATE OR REPLACE FUNCTION assign_delivery_order(curr TIMESTAMP) RETURNS TRIGGER
    AS $$
DECLARE
    current DATE;
BEGIN
    -- check schedule for available riders
    -- assign order to available riders
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
    EXECUTE PROCEDURE assign_delivery_order(current_timestamp);

*/

CREATE OR REPLACE FUNCTION complete_delivery_order_customer() RETURNS TRIGGER
    AS $$
BEGIN
    UPDATE customers c 
    SET order_count = order_count + 1, points = points + 1
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
    SET collection_time = current_timestamp
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
    SELECT c1.restaurant_id, c2.restaurant_id INTO restaurant_id_1, restaurant_id_2
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
