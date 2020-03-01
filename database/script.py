import sys;
# INSERT INTO restaurants (threshold, restaurant_name, restaurant_location, delivery_fee) VALUES ($1,$2,$3,$4)
restaurant = "restaurants (threshold, restaurant_name, restaurant_location, delivery_fee) VALUES ";
instruction = "INSERT INTO ";
i = 0;
while (i < 50):
    threshold = str((5 + i)) + ""
    restaurant_name = "'test name " + str(i) + "' ";
    restaurant_location = "'test location " + str(i) + "' ";
    delivery_fee = i;
    result = instruction + restaurant + '(' + threshold + ',' + restaurant_name + ',' + restaurant_location + ',' + str(delivery_fee) + ');' + '\n';
    sys.stdout.write(result);
    i = i + 1 ;

    
