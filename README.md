# KrapFood
## CS2102 AY 19/20 Sem 2 project 
### Developers 
1. [Yan Wei Liang](https://github.com/uberSaiyan)
1. [Eugene Teu](https://github.com/EugeneTeu)
1. [Liaw Siew Yee](https://github.com/liawsy)
1. [Lin Mei An](https://github.com/hellopanda128)

# Introduction 
This is a simulated Food Delivery system built using **ReactJS**, **ExpressJS** and **PostgreSQL**.

## Requirement
Users must have the following installed: 
* NodeJS
* NPM
* PostgreSQL **version 12**

## How to run 

### Database instructions

#### Setup database
1. The guide assumes you installed **PostgreSQL version 12** already.
2. Set up your database. For example, create a database with name `KrapFood` and `me` as user.
   (refer to this link for help:
    [PostgreSQL setup](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/) )
2. Create a `.env` file in the `backend` folder

      Ensure that `DATABASE_PORT` is set to the port Postgres server is running on.
      For example:
      ```
      DATABASE_USER=me
      DATABASE_HOST=localhost
      DATABASE_NAME=krapfood
      DATABASE_PASSWORD=password
      DATABASE_PORT=5432
      ```

#### Frontend
We will run the frontend in your browser
1. Open terminal in frontend folder or type `cd frontend` from root directory
2. Type `npm install` to install dependencies
3. Type `npm start` to start the frontend application on **localhost:3000**

#### Backend
We will build the database and start the backend server
1. Open terminal in backend folder or type `cd backend` from root directory 
2. Type `npm install` to install dependencies
3. Type `npm run build` to run a script that builds the database and generates data for the application
4. Type `npm start` to start the backend application on **localhost:5000**

*The application should be running in your browser now*

#### Testing
Testing for customer:
- Login with email address **c0** and password **p0**

Testing for staff:
- Login with email address **nunc.risus.varius@feugiatSed.ca** and password **IQR03DAC6ZB**

Testing for rider:
- Login with email address **malesuada@Aeneangravidanunc.org** and password **password**

Testing for manager:
- Login with email address **et@iaculis.com** and password **password**

Testing for orders:
1. Login with the given email address and password for the customer above. 
2. Click on the tab **Order Food** and select restaurant **Macdonner**. Place an order from them.
3. Log out of customer and log in to staff with the given email address and password for the staff above.
4. Click on the tab **Update Orders** and click on **Ready to deliver**. The order is identified by the **order_id** at the left side of the entry.
5. Perform a query on the database to retrieve the rider email and password for login as follows, with the placeholder `$1` replaced by the **order_id**:
`SELECT email, password
FROM Users U JOIN Riders R ON U.user_id = R.rider_id
JOIN Delivers D ON R.rider_id = D.rider_id
WHERE D.order_id = $1`
6. Login to riders with the email and password retrieved from the query.
7. Click on the **Assigned Orders** tab.
8. Click on **depart to collect**, **I have arrived**, **depart from restaurant** and **Complete Delivery** sequentially. The buttons will appear in order.
9. The order is now completed and will be reflected under the completed orders section for both the rider and customer.
