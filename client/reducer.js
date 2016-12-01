import { mapReducers } from 'redux-map-reducers';

import * as constants from './constants';
import { ANALYSIS_STATUS_SUCCEEDED, ANALYSIS_STATUS_FAILED, ANALYSIS_STATUS_PENDING } from '../shared/constants';

const initialState = {
  analyses: [],
  libraries: [],
  sortBy: 'name',
  sortReversed: false,
  usedLibraries: [],
  searchTerms: ''
};

const reducerMap = {
  [constants.SORT]: sort,
  [constants.USE]: use,
  [constants.STOP_USING]: stopUsing,
  [constants.SEARCH]: search,
  [constants.FETCH_LIBRARIES_SUCCEEDED]: fetchLibrariesSucceeded,
  [constants.START_ANALYSIS]: startAnalysis,
  [constants.ANALYSIS_SUCCEEDED]: analysisSucceeded,
  [constants.ANALYSIS_FAILED]: analysisFailed
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

function sort(state, action) {
  return {
    ...state,
    sortBy: action.sortBy,
    sortReversed: state.sortBy === action.sortBy ? !state.sortReversed : false
  };
}

function use(state, action) {
  return {
    ...state,
    usedLibraries: [...state.usedLibraries, action.library]
  };
}

function stopUsing(state, action) {
  return {
    ...state,
    usedLibraries: state.usedLibraries.filter(lib => lib.name !== action.library)
  };
}

function search(state, action) {
  return {
    ...state,
    searchTerms: action.searchTerms
  };
}

function fetchLibrariesSucceeded(state, action) {
  return {
    ...state,
    libraries: action.libraries
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

export default mapReducers(reducerMap, initialState);
