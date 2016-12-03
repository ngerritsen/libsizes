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

function analysisProgressed(id, message) {
  return {
    type: constants.ANALYSIS_PROGRESSED,
    message,
    id
  };
}

function analysisSucceeded(id, result) {
  return {
    type: constants.ANALYSIS_SUCCEEDED,
    result,
    id
  };
}

function analysisFailed(id, error) {
  return {
    type: constants.ANALYSIS_FAILED,
    error,
    id
  };
}

module.exports = {
  analysisRequested,
  analysisStarted,
  analysisProgressed,
  analysisSucceeded,
  analysisFailed
};
