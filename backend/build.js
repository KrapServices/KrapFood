const fs = require('fs');
const { transact } = require('./database');
const services = require("./services");
const axios = require('axios');

const DATABASE_DIRECTORY = '../database';
const { queries } = require(`${DATABASE_DIRECTORY}/build.json`);

async function build(queries) {
  try {
    await transact(async (query) => {
      function execute(fileName) {
        const path = `${DATABASE_DIRECTORY}/${fileName}`;
        const queries = fs.readFileSync(path, { encoding: 'utf-8' });
        return query(queries);
      }
      // Do this in order because sql scripts may depend on previous scripts 
      for (const query of queries) {
        await execute(query);
      }
      //await executeCreateCustomer();
      //await executeCreateManager();
    })
    console.log('Successfully built database.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    console.error('Failed to build database.');
    process.exit(1);
  }
}

async function executeCreateCustomer() {
  try {

    for (let i = 0; i < 50; i++) {
      const email = "test " + i;
      const password = "p" + i;
      
      await axios.post("http://localhost:5000/registrations/customer/sign-up", {
        email,
        password
      }, {
        headers: { 'Access-Control-Allow-Origin': true },
      });

    }

    console.log('Successfully created customer.');
    //process.exit(0);
  } catch (error) {
    throw error;
  }
}

async function executeCreateManager() {
  try {

    for (let i = 0; i < 50; i++) {
      const email = "test " + i;
      const password = "p" + i;

      axios.post("http://localhost:5000/registrations/manager/sign-up", {
        email,
        password
      }, {
        headers: { 'Access-Control-Allow-Origin': true },
      }).then(res => console.log(res));

    }

    console.log('Successfully created manager.');
    //process.exit(0);
  } catch (error) {
    throw error;
  }
}

build(queries);
