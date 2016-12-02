import { mapReducers } from 'redux-map-reducers';

import * as constants from './constants';
import * as sharedConstants from '../shared/constants';

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
  [sharedConstants.ANALYSIS_REQUESTED]: analysisRequested,
  [sharedConstants.ANALYSIS_STARTED]: analysisStarted,
  [sharedConstants.ANALYSIS_SUCCEEDED]: analysisSucceeded,
  [sharedConstants.ANALYSIS_FAILED]: analysisFailed
};

function analysisRequested(state, { id, libraryString }) {
  return {
    ...state,
    analyses: [...state.analyses, createAnalysis(id, libraryString)]
  };
}

function analysisStarted(state, { id }) {
  return {
    ...state,
    analyses: updateAnalysisStatus(state.analyses, id, constants.ANALYSIS_STATUS_PENDING)
  };
}

function analysisSucceeded(state, { id }) {
  return {
    ...state,
    analyses: updateAnalysisStatus(state.analyses, id, constants.ANALYSIS_STATUS_SUCCEEDED)
  };
}

function analysisFailed(state, { id, error }) {
  return {
    ...state,
    analyses: updateAnalysisStatus(state.analyses, id, constants.ANALYSIS_STATUS_FAILED, error)
  };
}

function sort(state, { sortBy }) {
  return {
    ...state,
    sortBy,
    sortReversed: state.sortBy === sortBy ? !state.sortReversed : false
  };
}

function use(state, { library }) {
  return {
    ...state,
    usedLibraries: [...state.usedLibraries, library]
  };
}

function stopUsing(state, { library }) {
  return {
    ...state,
    usedLibraries: state.usedLibraries.filter(({ name }) => name !== library)
  };
}

function search(state, { searchTerms }) {
  return {
    ...state,
    searchTerms
  };
}

function fetchLibrariesSucceeded(state, { libraries }) {
  return {
    ...state,
    libraries
  };
}

function createAnalysis(id, libraryString) {
  return {
    status: constants.ANALYSIS_STATUS_WAITING,
    libraryString,
    error: null,
    id
  };
}

function updateAnalysisStatus(analyses, id, status, error = null) {
  return analyses.map(analysis => {
    if (analysis.id === id) {
      return Object.assign({}, analysis, { status, error });
    }

    return analysis;
  });
}

export default mapReducers(reducerMap, initialState);
