const express = require('express');
const routing = require('./routing');
const initializeDb = require('./db');
const LibraryRepository = require('./library-repository');

initializeDb()
  .then(initializeApp)
  .catch(error => {
    console.error(error);
    process.exit(1); // eslint-disable-line no-process-exit
  });

function initializeApp(dbClient) {
  const app = express();
  const port = process.env.PORT || 8022;

  const libraryRepository = new LibraryRepository(dbClient);

  routing(app, libraryRepository);

  app.listen(port, () => {
    console.log(`Listening to port ${port}.`);
  });
}
