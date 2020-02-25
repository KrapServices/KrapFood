## Postgres database instructions

### Setup database locally

Follow this link to set up your local databse. The guide assumes you installed postgres already.

I created my local db as `KrapFood` and `me` as user.

[https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/](Postgres sql setup)

### Building the database

The sql scripts executed when building the database can be found in `build.json`. To add one more script to execute when building the database, simply add the path of the sql script relative to this folder (`database/`). Note that the sql scripts are executed according to their order in the `queries` list. This is important when some tables depend on other tables. Finally, to build the database, simply run the command `npm run build` in the `backend/` folder. 