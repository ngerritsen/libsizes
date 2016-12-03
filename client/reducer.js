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
  [sharedConstants.ANALYSIS_PROGRESSED]: analysisProgressed,
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
  const message = 'Analysis starting...';
  return {
    ...state,
    analyses: updateAnalysis(state.analyses, id, { status: constants.ANALYSIS_STATUS_PENDING, message })
  };
}

function analysisProgressed(state, { id, message }) {
  return {
    ...state,
    analyses: updateAnalysis(state.analyses, id, { message })
  };
}

function analysisSucceeded(state, { id, result }) {
  return {
    ...state,
    analyses: updateAnalysis(state.analyses, id, { status: constants.ANALYSIS_STATUS_SUCCEEDED, result })
  };
}

function analysisFailed(state, { id, error }) {
  return {
    ...state,
    analyses: updateAnalysis(state.analyses, id, { status: constants.ANALYSIS_STATUS_FAILED, error })
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
    message: 'Waiting for server...',
    result: null,
    id
  };
}

function updateAnalysis(analyses, id, updates) {
  return analyses.map(analysis => {
    if (analysis.id === id) {
      return {
        ...analysis,
        ...updates
      };
    }

    return analysis;
  });
}

export default mapReducers(reducerMap, initialState);
