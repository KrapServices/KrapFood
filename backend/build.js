const fs = require('fs');
const { transact } = require('./database');

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
    })
    console.log('Successfully built database.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    console.error('Failed to build database.');
    process.exit(1);
  }
}

build(queries);
