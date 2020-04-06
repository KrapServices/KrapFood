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