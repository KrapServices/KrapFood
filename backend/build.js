const fs = require('fs');
const { transact } = require('./database');
const { definitions, triggers, instantiations } = require('../database/build.json');

function getPath(fileName) {
  return `../database/${fileName}`;
}

function read(file) {
  const path = getPath(file);
  return fs.readFileSync(path, { encoding: 'utf-8' });
}

async function execute(file, query) {
  const sqlQuery = read(file);
  await query(sqlQuery);
  console.log(`Executed ${file}`);
}

async function executeSequentially(files, query) {
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    await execute(file, query);
  }
}

async function buildDefinitions(query) {
  await executeSequentially(definitions, query);
}

async function buildTriggers(query) {
  await executeSequentially(triggers, query);
}

async function buildInstantiations(query) {
  await executeSequentially(instantiations, query);
}

async function build() {
  try {
    await transact(async (query) => {
      await buildDefinitions(query);
      await buildTriggers(query);
      await buildInstantiations(query);
    });
    console.log('Successfully built database.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

build();
