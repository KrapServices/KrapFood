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
