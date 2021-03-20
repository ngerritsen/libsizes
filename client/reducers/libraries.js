import { mapReducers } from "redux-map-reducers";

import * as constants from "../constants";

const initialState = {
  libraries: [],
  sortBy: "name",
  sortReversed: false,
  usedLibraries: [],
  searchTerms: "",
};

const reducerMap = {
  [constants.SORT]: sort,
  [constants.USE]: use,
  [constants.STOP_USING]: stopUsing,
  [constants.SEARCH]: search,
  [constants.FETCH_LIBRARIES_SUCCEEDED]: fetchLibrariesSucceeded,
};

function sort(state, { sortBy }) {
  return {
    ...state,
    sortBy,
    sortReversed: state.sortBy === sortBy ? !state.sortReversed : false,
  };
}

function use(state, { library }) {
  return {
    ...state,
    usedLibraries: [...state.usedLibraries, library],
  };
}

function stopUsing(state, { library }) {
  return {
    ...state,
    usedLibraries: state.usedLibraries.filter((name) => name !== library),
  };
}

function search(state, { searchTerms }) {
  return {
    ...state,
    searchTerms,
  };
}

function fetchLibrariesSucceeded(state, { libraries }) {
  return {
    ...state,
    libraries,
  };
}

export default mapReducers(reducerMap, initialState);
