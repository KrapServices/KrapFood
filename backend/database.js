require('dotenv').config();
const { Pool } = require('pg');

// Documentation for pg: https://node-postgres.com/

const config = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
}

const pool = new Pool(config); 

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connection successful');
  }
  pool.end();
});

exports.modules = pool;
