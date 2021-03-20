const winston = require("winston");

const {
  analysisSucceeded,
  analysisFailed,
  analysisProgressed,
} = require("../shared/actions");
const { ANALYSIS_UPDATED } = require("../shared/constants");

class AnalysisService {
  constructor(socket, libraryRepository, analyzer, npm) {
    this._socket = socket;
    this._libraryRepository = libraryRepository;
    this._analyzer = analyzer;
    this._npm = npm;
  }

  async analyze(analysisId, libraryString) {
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

  async _analyze(library, analysisId, libraryString) {
    try {
      winston.info(`Started processing "${libraryString}".`, { analysisId });

      const result = await this._analyzer.analyze(
        library,
        analysisId,
        (message) => this._onProgress(analysisId, message)
      );

      this._onProgress(analysisId, "Saving result...");

      await this._libraryRepository.save(
        library.name,
        library.version,
        result,
        libraryString,
        analysisId
      );

      this._emit(analysisSucceeded(analysisId, result));
    } catch (error) {
      this._emit(analysisFailed(analysisId, error.message));
      winston.error(error.message, { analysisId });
      throw error;
    }
  }

  _emit(action) {
    this._socket.emit(ANALYSIS_UPDATED, action);
  }

  _onProgress(analysisId, message) {
    winston.info(message, { analysisId });
    this._emit(analysisProgressed(analysisId, message));
  }
}

module.exports = AnalysisService;
