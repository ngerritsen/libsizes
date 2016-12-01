const pg = require('pg');

const productionConfig = process.env.DATABASE_URL;
const config = productionConfig || {
  user: 'dev',
  password: 'development',
  database: 'libsizes'
};

function initializeDb() {
  pg.defaults.ssl = !!productionConfig;

  return pg.connect(config)
    .then(client => initializeTables(client)
      .then(() => client)
    );
}

function initializeTables(client) {
  return client.query(`
    CREATE TABLE IF NOT EXISTS libraries (
      name      varchar(40) NOT NULL,
      version   varchar(12) NOT NULL,
      normal    integer     NOT NULL,
      minified  integer     NOT NULL,
      gzipped   integer     NOT NULL,
      PRIMARY KEY(name, version)
    );
  `);
}

module.exports = initializeDb;
