const { START_ANALYSIS, ANALYSIS_SUCCEEDED, ANALYSIS_FAILED } = require('./constants');
const { ANALYSIS_STATUS_PENDING, ANALYSIS_STATUS_SUCCEEDED, ANALYSIS_STATUS_FAILED } = require('../shared/constants');
const { mapReducers } = require('redux-map-reducers');

const initialState = {
  analyses: []
};

const reducerMap = {
  [START_ANALYSIS]: startAnalysis,
  [ANALYSIS_SUCCEEDED]: analysisSucceeded,
  [ANALYSIS_FAILED]: analysisFailed
};

function startAnalysis(state, action) {
  return {
    analyses: [...state.analyses, createAnalysis(action.id)]
  };
}

function analysisSucceeded(state, action) {
  return {
    analyses: updateAnalysisState(state.analyses, action.id, ANALYSIS_STATUS_SUCCEEDED)
  };
}

function analysisFailed(state, action) {
  return {
    analyses: updateAnalysisState(state.analyses, action.id, ANALYSIS_STATUS_FAILED)
  };
}

function createAnalysis(id) {
  return {
    status: ANALYSIS_STATUS_PENDING,
    id
  };
}

function updateAnalysisState(analyses, id, status) {
  return analyses.map(analysis => {
    if (analysis.id === id) {
      return Object.assign({}, analysis, { status });
    }

    return analysis;
  });
}

module.exports = mapReducers(reducerMap, initialState);
