import * as constants from '../constants'

export function sort(sortBy) {
  return {
    type: constants.SORT,
    sortBy
  }
}

export function use(library) {
  return {
    type: constants.USE,
    library
  }
}

export function stopUsing(library) {
  return {
    type: constants.STOP_USING,
    library
  }
}

export function search(searchTerms) {
  return {
    type: constants.SEARCH,
    searchTerms
  }
}

export function fetchLibrariesSucceeded(libraries) {
  return {
    type: constants.FETCH_LIBRARIES_SUCCEEDED,
    libraries
  }
}
