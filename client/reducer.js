import { mapReducers } from 'redux-map-reducers';

import { SORT, USE, STOP_USING, SEARCH, FETCH_LIBRARIES_SUCCEEDED } from './constants';

const initialState = {
  libraries: [],
  sortBy: 'name',
  sortReversed: false,
  usedLibraries: [],
  searchTerms: ''
};

const reducerMap = {
  [SORT]: sort,
  [USE]: use,
  [STOP_USING]: stopUsing,
  [SEARCH]: search,
  [FETCH_LIBRARIES_SUCCEEDED]: fetchLibrariesSucceeded
};

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

export default mapReducers(reducerMap, initialState);