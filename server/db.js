const pg = require("pg");

const databaseUrl = process.env.DATABASE_URL;
const config = databaseUrl
  ? {
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false },
    }
  : {
      user: "dev",
      password: "development",
      database: "libsizes",
    };

function initializeDb() {
  const client = new pg.Pool(config);

  return initializeTables(client).then(() => client);
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
