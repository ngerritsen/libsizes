const { ANALYSIS_STARTED, ANALYSIS_SUCCEEDED, ANALYSIS_FAILED } = require('./constants');

function analysisStarted(id) {
  return {
    type: ANALYSIS_STARTED,
    id
  };
}

function analysisSucceeded(id) {
  return {
    type: ANALYSIS_SUCCEEDED,
    id
  };
}

function analysisFailed(id) {
  return {
    type: ANALYSIS_FAILED,
    id
  };
}

module.exports = {
  analysisStarted,
  analysisSucceeded,
  analysisFailed
};
