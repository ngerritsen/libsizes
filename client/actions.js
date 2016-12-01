import * as constants from './constants';

export function startAnalysis(id) {
  return {
    type: constants.START_ANALYSIS,
    id
  };
}

export function analysisSucceeded(id) {
  return {
    type: constants.ANALYSIS_SUCCEEDED,
    id
  };
}

export function analysisFailed(id) {
  return {
    type: constants.ANALYSIS_FAILED,
    id
  };
}

export function analyze(libraryString) {
  return {
    type: constants.ANALYZE,
    libraryString
  };
}

export function sort(sortBy) {
  return {
    type: constants.SORT,
    sortBy
  };
}

export function use(library) {
  return {
    type: constants.USE,
    library
  };
}

export function stopUsing(library) {
  return {
    type: constants.STOP_USING,
    library
  };
}

export function search(searchTerms) {
  return {
    type: constants.SEARCH,
    searchTerms
  };
}

export function fetchLibrariesSucceeded(libraries) {
  return {
    type: constants.FETCH_LIBRARIES_SUCCEEDED,
    libraries
  };
}
