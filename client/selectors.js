import * as helpers from "./helpers";

export const getLibraryCount = (state) => state.libraries.libraries.length;
export const getVersions = (state, name) =>
  helpers.sortByVersion(
    state.libraries.libraries.filter((library) => library.name === name)
  );

export const getLibrary = (state, name) =>
  helpers.sortByVersion(
    state.libraries.libraries.find((library) => library.name === name)
  );

export const getSearchTerms = (state) => state.libraries.searchTerms;

export const getMarkedLibraries = (state) =>
  helpers.markUsedLibraries(
    state.libraries.libraries,
    state.libraries.usedLibraries
  );

export const getMarkedCollapsedLibraries = (state) =>
  helpers.collapseLibraries(getMarkedLibraries(state));

export const getMarkedSearchedLibraries = (state) =>
  helpers.searchLibraries(
    getMarkedCollapsedLibraries(state),
    state.libraries.searchTerms
  );

export const getMarkedSearchedAndSortedLibraries = (state) =>
  helpers.sortLibraries(
    getMarkedSearchedLibraries(state),
    state.libraries.sortBy,
    state.libraries.sortReversed
  );

export const getLibraryTotals = (state) =>
  helpers.calculateTotals(getMarkedLibraries(state));

export const getSortBy = (state) => state.libraries.sortBy;
export const getSortReversed = (state) => state.libraries.sortReversed;

export const getAnalyses = (state) => state.analysis.analyses;
export const getLibraryInput = (state) => state.analysis.libraryInput;
