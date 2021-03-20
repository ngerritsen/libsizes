import { mapReducers } from "redux-map-reducers";

import * as constants from "../constants";
import * as sharedConstants from "../../shared/constants";

const initialState = {
  analyses: [],
  libraryInput: "",
};

const reducerMap = {
  [sharedConstants.ANALYSIS_REQUESTED]: analysisRequested,
  [sharedConstants.ANALYSIS_STARTED]: analysisStarted,
  [sharedConstants.ANALYSIS_SKIPPED]: analysisSkipped,
  [sharedConstants.ANALYSIS_PROGRESSED]: analysisProgressed,
  [sharedConstants.ANALYSIS_SUCCEEDED]: analysisSucceeded,
  [sharedConstants.ANALYSIS_FAILED]: analysisFailed,
  [constants.ANALYZE]: analyze,
  [constants.INPUT_ANALYSIS_LIBRARY]: inputAnalysisLibrary,
};

function inputAnalysisLibrary(state, { libraryInput }) {
  return {
    ...state,
    libraryInput,
  };
}

function analyze(state) {
  return {
    ...state,
    libraryInput: "",
  };
}

function analysisRequested(state, { id, libraryString }) {
  return {
    ...state,
    analyses: [...state.analyses, createAnalysis(id, libraryString)],
  };
}

function analysisStarted(state, { id, version }) {
  const message = "Analysis starting...";
  return {
    ...state,
    analyses: updateAnalysis(state.analyses, id, {
      status: constants.ANALYSIS_STATUS_PENDING,
      message,
      version,
    }),
  };
}

function analysisSkipped(state, { id, result, version }) {
  return {
    ...state,
    analyses: updateAnalysis(state.analyses, id, {
      status: constants.ANALYSIS_STATUS_SKIPPED,
      result,
      version,
    }),
  };
}

function analysisProgressed(state, { id, message }) {
  return {
    ...state,
    analyses: updateAnalysis(state.analyses, id, { message }),
  };
}

function analysisSucceeded(state, { id, result }) {
  return {
    ...state,
    analyses: updateAnalysis(state.analyses, id, {
      status: constants.ANALYSIS_STATUS_SUCCEEDED,
      result,
    }),
  };
}

function analysisFailed(state, { id, error }) {
  return {
    ...state,
    analyses: updateAnalysis(state.analyses, id, {
      status: constants.ANALYSIS_STATUS_FAILED,
      error,
    }),
  };
}

function createAnalysis(id, libraryString) {
  return {
    status: constants.ANALYSIS_STATUS_WAITING,
    libraryString,
    error: null,
    version: null,
    message: "Waiting for server...",
    result: null,
    id,
  };
}

function updateAnalysis(analyses, id, updates) {
  return analyses.map((analysis) => {
    if (analysis.id === id) {
      return {
        ...analysis,
        ...updates,
      };
    }

    return analysis;
  });
}

export default mapReducers(reducerMap, initialState);
