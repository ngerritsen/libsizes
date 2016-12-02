const { getInfo } = require('./npm-tools');
const { analysisSucceeded, analysisFailed } = require('../shared/actions');
const { ANALYSIS_UPDATED } = require('../shared/constants');
const analyzeLibrary = require('./analyzer');

class AnalysisService {
  constructor(socket, libraryRepository) {
    this._socket = socket;
    this._libraryRepository = libraryRepository;
  }

  startAnalysis(analysisId, libraryString) {
    return getInfo(libraryString)
      .then(library => {
        this._analyze(library, analysisId);
        return analysisId;
      });
  }

  _emit(action) {
    this._socket.emit(ANALYSIS_UPDATED, action);
  }

  _analyze(library, analysisId) {
    analyzeLibrary(library)
      .then(result => this._libraryRepository.save(library.name, library.version, result))
      .then(() => this._emit(analysisSucceeded(analysisId)))
      .catch(error => this._emit(analysisFailed(analysisId, error.toString())));
  }
}

module.exports = AnalysisService;
