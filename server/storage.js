const pg = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 0.0.0.0:5432:

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, (err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
