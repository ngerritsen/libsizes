import { createSelector } from "@reduxjs/toolkit";
import * as helpers from "./helpers";
import { RootState } from "./store";
import { Analysis, Library } from "./types";

export const getLibrariesFetching = (state: RootState): boolean =>
  state.libraries.fetching;

export const getLibraries = (state: RootState): Library[] =>
  state.libraries.libraries;

export const getUsedLibraries = (state: RootState): string[] =>
  state.libraries.usedLibraries;

export const getLibraryCount = (state: RootState): number =>
  getLibraries(state).length;

export const getVersions = (state: RootState, name: string): Library[] =>
  helpers.sortByVersion(
    getLibraries(state).filter((library) => library.name === name)
  );

export const getSortBy = (state: RootState): string => state.libraries.sortBy;
export const getSortReversed = (state: RootState): boolean =>
  state.libraries.sortReversed;

export const getAnalyses = (state: RootState): Analysis[] =>
  state.analysis.analyses;

export const getLibraryInput = (state: RootState): string =>
  state.analysis.libraryInput;

export const getLibrary = (
  state: RootState,
  name: string
): Library | undefined =>
  getLibraries(state).find((library: Library) => library.name === name);

export const getSearchTerms = (state: RootState): string =>
  state.libraries.searchTerms;

export const getMarkedLibraries = createSelector(
  getLibraries,
  getUsedLibraries,
  helpers.markUsedLibraries
);

export const getMarkedCollapsedLibraries = createSelector(
  getMarkedLibraries,
  helpers.collapseLibraries
);

export const getMarkedSearchedLibraries = createSelector(
  getMarkedCollapsedLibraries,
  getSearchTerms,
  helpers.searchLibraries
);

export const getMarkedSearchedAndSortedLibraries = createSelector(
  getMarkedSearchedLibraries,
  getSortBy,
  getSortReversed,
  helpers.sortLibraries
);

export const getLibraryTotals = createSelector(
  getMarkedLibraries,
  helpers.calculateTotals
);
