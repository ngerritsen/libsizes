const constants = require('./constants');

function analysisRequested(id, libraryString) {
  return {
    type: constants.ANALYSIS_REQUESTED,
    libraryString,
    id
  };
}

function analysisStarted(id) {
  return {
    type: constants.ANALYSIS_STARTED,
    id
  };
}

function analysisSucceeded(id) {
  return {
    type: constants.ANALYSIS_SUCCEEDED,
    id
  };
}

function analysisFailed(id, error = 'Unknown error') {
  return {
    type: constants.ANALYSIS_FAILED,
    error,
    id
  };
}

module.exports = {
  analysisRequested,
  analysisStarted,
  analysisSucceeded,
  analysisFailed
};
