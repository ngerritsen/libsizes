const { START_ANALYSIS, ANALYSIS_SUCCEEDED, ANALYSIS_FAILED } = require('./constants');

function startAnalysis(id) {
  return {
    type: START_ANALYSIS,
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
  startAnalysis,
  analysisSucceeded,
  analysisFailed
};
