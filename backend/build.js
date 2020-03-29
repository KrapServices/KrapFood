const fs = require('fs');
const { transact } = require('./database');
const { queries: buildQueries } = require('../database/build.json');

async function build(queries) {
  try {
    await transact(async (query) => {
      function execute(fileName) {
        const path = `../database/${fileName}`;
        const lines = fs.readFileSync(path, { encoding: 'utf-8' });
        return query(lines);
      }

      // Do this in order because sql scripts may depend on previous scripts
      queries.forEach((sqlQuery) => {
        execute(sqlQuery);
      });
    });
    console.log('Successfully built database.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    console.error('Failed to build database.');
    process.exit(1);
  }
}

build(buildQueries);
