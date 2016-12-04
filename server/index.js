const express = require('express');
const { Server } = require('http');
const socketIo = require('socket.io');
const winston = require('winston');

const routing = require('./routing');
const initializeDb = require('./db');
const LibraryRepository = require('./library-repository');
const AnalysisService = require('./analysis-service');

initializeDb()
  .then(initializeApp)
  .catch(error => {
    console.error(error);
    process.exit(1); // eslint-disable-line no-process-exit
  });

function initializeApp(dbClient) { // eslint-disable-line max-statements
  const app = express();
  const server = Server(app); // eslint-disable-line new-cap
  const io = socketIo(server);
  const port = process.env.PORT || 8022;

  const libraryRepository = new LibraryRepository(dbClient);
  const analysisService = new AnalysisService(io, libraryRepository);

  routing(app, libraryRepository, analysisService);

  server.listen(port, error => {
    if (error) {
      throw error;
    }

    winston.info(`Libsizes started, listening on port ${port}.`);
  });
}
