import * as constants from "../constants";

export function analyze(libraryString) {
  return {
    type: constants.ANALYZE,
    libraryString,
  };
}

export function inputAnalysisLibrary(libraryInput) {
  return {
    type: constants.INPUT_ANALYSIS_LIBRARY,
    libraryInput,
  };
}

export function failedAnalysisAttempt() {
  return {
    type: constants.FAILED_ANALYSIS_ATTEMPT,
  };
}
