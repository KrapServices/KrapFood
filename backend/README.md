## Set up steps:

1. `npm install` to install modules
2. Create a `.env` file to store environment variables
3. Copy the content in `env.example` into the `.env` file
4. Change the values in `.env` to fit your environment

Ensure that postgresql instance is running in the background

Database port number is hardcoded to port 5432. Ensure your post gres instance is running on this.

## Enable hot reload:

run `npx nodemon app.js` to enable hot reload using nodemon
