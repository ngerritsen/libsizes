import express from "express";
import { Server } from "http";
import socketIo from "socket.io";
import winston from "winston";
import { Pool } from "pg";

import routes from "./routes";
import initializeDb from "./db";
import LibraryRepository from "./LibraryRepository";
import AnalysisService from "./AnalysisService";
import Npm from "./Npm";
import Webpack from "./Webpack";
import Filesizes from "./Filesizes";
import { DEV_SERVER_PORT } from "../shared/constants";

initializeDb()
  .then(initializeApp)
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });

function initializeApp(client: Pool) {
  const app = express();
  const server = new Server(app);
  const io = socketIo(server);
  const port = process.env.PORT || DEV_SERVER_PORT;

  const libraryRepository = new LibraryRepository(client);
  const analysisService = new AnalysisService(
    io,
    libraryRepository,
    new Npm(),
    new Webpack(),
    new Filesizes()
  );

  routes(app, libraryRepository, analysisService);

  server.listen(port, () => {
    winston.info(`Libsizes started, listening on port ${port}.`);
  });
}
