import { SORT, USE, STOP_USING, SEARCH, FETCH_LIBRARIES_SUCCEEDED } from './constants';

export function sort(sortBy) {
  return {
    type: SORT,
    sortBy
  };
}

export function use(library) {
  return {
    type: USE,
    library
  };
}

export function stopUsing(library) {
  return {
    type: STOP_USING,
    library
  };
}

export function search(searchTerms) {
  return {
    type: SEARCH,
    searchTerms
  };
}

export function fetchLibrariesSucceeded(libraries) {
  return {
    type: FETCH_LIBRARIES_SUCCEEDED,
    libraries
  };
}