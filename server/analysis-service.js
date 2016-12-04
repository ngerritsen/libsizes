const winston = require('winston');

const { getInfo } = require('./helpers/npm');
const { analysisSucceeded, analysisFailed, analysisProgressed } = require('../shared/actions');
const { ANALYSIS_UPDATED } = require('../shared/constants');
const analyzeLibrary = require('./analyzer');

class AnalysisService {
  constructor(socket, libraryRepository) {
    this._socket = socket;
    this._libraryRepository = libraryRepository;
  }

  startAnalysis(analysisId, libraryString) {
    winston.info(`Started processing "${libraryString}".`, { analysisId });
    return getInfo(libraryString)
      .then(library => {
        this._analyze(library, analysisId);
        return analysisId;
      })
      .catch(error => winston.error(error.message, { analysisId }));
  }

  _emit(action) {
    this._socket.emit(ANALYSIS_UPDATED, action);
  }

  _onProgress(analysisId, message) {
    winston.info(message, { analysisId });
    this._emit(analysisProgressed(analysisId, message));
  }

  _analyze(library, analysisId) {
    analyzeLibrary(library, analysisId, message => this._onProgress(analysisId, message))
      .tap(() => this._onProgress(analysisId, 'Saving result...'))
      .tap(result => this._libraryRepository.save(library.name, library.version, result))
      .then(result => this._emit(analysisSucceeded(analysisId, result)))
      .catch(error => {
        this._emit(analysisFailed(analysisId, error.message));
        winston.error(error.message, { analysisId });
      });
  }
}

module.exports = AnalysisService;
