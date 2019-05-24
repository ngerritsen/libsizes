const pg = require('pg');

const productionConfig = process.env.DATABASE_URL;
const config = productionConfig || {
  user: 'dev',
  password: 'development',
  database: 'libsizes'
};

function initializeDb() {
  pg.defaults.ssl = !!productionConfig;

  return pg.connect(config).then(client => initializeTables(client).then(() => client));
}

function initializeTables(client) {
  return client.query(`
    CREATE TABLE IF NOT EXISTS libraries (
      name      varchar(64) NOT NULL,
      version   varchar(64) NOT NULL,
      normal    integer     NOT NULL,
      minified  integer     NOT NULL,
      gzipped   integer     NOT NULL,
      timestamp timestamp   NOT NULL,
      analysis  varchar(32) NOT NULL,
      request   varchar(64),
      PRIMARY KEY(name, version)
    );
  `);
}

module.exports = initializeDb;
