import { SORT, USE, STOP_USING, SEARCH } from './constants';

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
