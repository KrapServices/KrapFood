CREATE TABLE orders 
(
    order_id SERIAL,
    total_cost NUMERIC(10, 2) NOT NULL,
    CONSTRAINT positive_total_cost CHECK (total_cost > 0),
    status TEXT NOT NULL DEFAULT 'preparing', -- 'preparing' | 'delivering' | 'completed' 
    CHECK (status IN ('preparing', 'delivering', 'completed')),
    delivery_location TEXT NOT NULL,
    customer_id INTEGER NOT NULL,
    rating INTEGER,
    CONSTRAINT valid_rating CHECK (rating IN (1, 2, 3, 4, 5)),
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    modified_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (order_id),
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id) ON DELETE CASCADE
);

-- Order can have multiple promotions
CREATE TABLE promotions
(
    promo_id SERIAL,
    discount INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    PRIMARY KEY (promo_id)
);

CREATE TABLE applies
(
    promo_id INTEGER,
    order_id INTEGER,
    PRIMARY KEY (promo_id, order_id),
    FOREIGN KEY (promo_id) REFERENCES promotions (promo_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

CREATE TABLE contain
(
    order_id INTEGER, 
    restaurant_id INTEGER,
    food_name TEXT,
    quantity INTEGER NOT NULL,
    CONSTRAINT positive_quantity CHECK (quantity > 0),
    PRIMARY KEY (order_id, restaurant_id, food_name),
    FOREIGN KEY (restaurant_id, food_name) REFERENCES foods (restaurant_id, food_name),
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

CREATE TABLE delivers
(
    delivery_id SERIAL,
    rider_id INTEGER NOT NULL,
    order_id INTEGER NOT NULL UNIQUE,
    delivery_fee NUMERIC(10, 2) NOT NULL,
    departure_time TIME,
    arrival_time TIME,
    completion_time TIME,
    collection_time TIME,
    PRIMARY KEY (delivery_id),
    FOREIGN KEY (rider_id) REFERENCES riders (rider_id),
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);

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
    UPDATE Customers c 
    SET order_count = order_count + 1, points = point + 1
    where c.customer_id =  NEW.customer_id
    RETURN NULL:
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS complete_delivery_order_customer_trigger on Orders CASCADE;
CREATE TRIGGER complete_delivery_order_customer_trigger 
    AFTER update of status
    on orders
    FOR EACH ROW
    WHEN (NEW.status = 'completed')
    --assign rider
    EXECUTE PROCEDURE complete_delivery_order_customer();

CREATE OR REPLACE FUNCTION complete_delivery_order_rider() RETURNS TRIGGER
    AS $$
BEGIN
    UPDATE delivers d
    SET collection_time = current
    where d.order_id = NEW.order_id
    RETURN NULL:
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS complete_delivery_order_rider_trigger on Orders CASCADE;
CREATE TRIGGER complete_delivery_order_rider_trigger 
    AFTER update of status
    on orders
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
