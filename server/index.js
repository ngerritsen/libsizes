const express = require("express");
const { Server } = require("http");
const socketIo = require("socket.io");
const winston = require("winston");

const routing = require("./routing");
const initializeDb = require("./db");
const LibraryRepository = require("./LibraryRepository");
const AnalysisService = require("./AnalysisService");
const Analyzer = require("./Analyzer");
const Npm = require("./Npm");
const Webpack = require("./Webpack");
const Filesizes = require("./Filesizes");

initializeDb()
  .then(initializeApp)
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

function initializeApp(dbClient) {
  const app = express();
  const server = Server(app);
  const io = socketIo(server);
  const port = process.env.PORT || 8022;

  const libraryRepository = new LibraryRepository(dbClient);
  const analyzer = new Analyzer(new Npm(), new Webpack(), new Filesizes());
  const analysisService = new AnalysisService(
    io,
    libraryRepository,
    analyzer,
    new Npm()
  );

  routing(app, libraryRepository, analysisService);

  server.listen(port, (error) => {
    if (error) {
      throw error;
    }

    winston.info(`Libsizes started, listening on port ${port}.`);
  });
}
