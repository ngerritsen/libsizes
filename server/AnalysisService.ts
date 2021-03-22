import { Server } from "socket.io";
import util from "util";
import rimraf from "rimraf";
import mkdirp from "mkdirp";
import path from "path";
import winston from "winston";

import LibraryRepository from "./LibraryRepository";
import Npm from "./Npm";
import { Environment } from "./types";
import * as actions from "../shared/actions";
import { ANALYSIS_UPDATED } from "../shared/constants";
import Webpack from "./Webpack";
import Filesizes from "./Filesizes";
import { TMP_DIR } from "./constants";
import { Library } from "../shared/types";

const rimrafAsync = util.promisify(rimraf);
const mkdirpAsync = util.promisify(mkdirp);

export default class AnalysisService {
  constructor(
    private _socket: Server,
    private _libraryRepository: LibraryRepository,
    private _npm: Npm,
    private _webpack: Webpack,
    private _filesizes: Filesizes
  ) {}

  public async analyze(
    analysisId: string,
    libraryString: string
  ): Promise<{ existing: Library; library: Library }> {
    try {
      const library = await this._npm.getInfo(libraryString);
      const existing = await this._libraryRepository.get(
        library.name,
        library.version
      );

      if (!existing) {
        this._analyze(library, analysisId, libraryString);
      }

      return { existing, library };
    } catch (error) {
      winston.error(error.message, { analysisId });
      throw error;
    }
  }

  public async _analyze(
    library: Library,
    analysisId: string,
    libraryString: string
  ): Promise<void> {
    winston.info(`Started processing "${libraryString}".`, { analysisId });
    const dir = path.resolve(TMP_DIR, analysisId);

    try {
      await mkdirpAsync(dir, undefined);

      this._onProgress(
        analysisId,
        `Installing ${library.name}@${library.version}...`
      );
      await this._npm.install(library, dir);

      this._onProgress(analysisId, "Running webpack build...");
      await this._webpack.build(library, dir, Environment.Development);

      this._onProgress(analysisId, "Running webpack minified build...");
      await this._webpack.build(library, dir, Environment.Production);

      this._onProgress(analysisId, "Measuring sizes...");
      const result = await this._filesizes.measure(dir);

      this._onProgress(analysisId, "Saving result...");

      await this._libraryRepository.save(
        library.name,
        library.version,
        result,
        libraryString,
        analysisId
      );

      this._emit(actions.analysisSucceeded({ id: analysisId, result }));
    } catch (error) {
      this._emit(
        actions.analysisFailed({ id: analysisId, error: error.message })
      );
      winston.error(error.message, { analysisId });
      await rimrafAsync(dir);
      throw error;
    } finally {
      this._onProgress(analysisId, "Cleaning up...");
      await rimrafAsync(dir);
    }
  }

  private _emit(action: Record<string, unknown>): void {
    this._socket.emit(ANALYSIS_UPDATED, action);
  }

  private _onProgress(analysisId: string, message: string): void {
    winston.info(message, { analysisId });
    this._emit(actions.analysisProgressed({ id: analysisId, message }));
  }
}
