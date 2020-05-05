# KrapFood
## CS2102 AY 19/20 sem 2 project 
### Developers 
1. [Yan Wei Liang](https://github.com/uberSaiyan)
1. [Eugene Teu](https://github.com/EugeneTeu)
1. [Liaw Siew Yee](https://github.com/liawsy)
1. [Mei An Lin](https://github.com/hellopanda128)

# Introduction 
This is a simulated Food Delivery system built using **ReactJs**, **ExpressJs** and **Postgres**.

## Requirement
Users must have the following installed: 
* Node - npm 
* Postgres **version 12**

## How to run 



#### Postgres database instructions

##### Setup database locally
1. Set up your local database. The guide assumes you installed **postgres version 12** already.
   ```e.g create a local db as `KrapFood` and `me` as user.```
   (refer to this link for help 
    [Postgres sql setup](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/) )
1. Create a ```.env``` file in the ```backend``` folder. 

      Ensure that ```SERVER_PORT``` is set to 5000 and ```DATABASE_PORT``` to the one that your database is running on.
      For e.g: 
      ```dotenv
      DATABASE_USER=me
      DATABASE_HOST=localhost
      DATABASE_NAME=krapfood
      DATABASE_PASSWORD=password
      DATABASE_PORT=5432
      SERVER_PORT=5000    
      ```
        
1. Ensure that you are able to access the database from the command line by typing ```psql -d <database_name> -U <user>```


#### Frontend
We will run the frontend in your browser
1. Open terminal in frontend folder or type ```cd frontend``` from root directory 
2. Type ```npm run start``` to start the frontend application on **localhost:3000**

#### Backend
We will build the database and start the backend server
1. Open terminal in backend folder or type ```cd backend``` from root directory 
2. Type ```npm run build``` to run the script that will build the database and the generate data for the application
3. Type ```npm run start``` to start the frontend application on **localhost:5000**

*The application should be running in your browser now*
