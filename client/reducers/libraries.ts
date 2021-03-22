import { createReducer } from "@reduxjs/toolkit";
import { Library } from "../types";
import * as actions from "../actions";

type LibrariesState = {
  libraries: Library[];
  sortBy: string;
  sortReversed: boolean;
  usedLibraries: string[];
  searchTerms: string;
};

const initialState: LibrariesState = {
  libraries: [],
  sortBy: "name",
  sortReversed: false,
  usedLibraries: [],
  searchTerms: "",
};

export default createReducer<LibrariesState>(initialState, (builder) =>
  builder
    .addCase(actions.sort, (state, { payload }) => {
      state.sortReversed =
        state.sortBy === payload ? !state.sortReversed : false;
      state.sortBy = payload;
    })
    .addCase(actions.use, (state, { payload }) => {
      state.usedLibraries.push(payload);
    })
    .addCase(actions.stopUsing, (state, { payload }) => {
      state.usedLibraries = state.usedLibraries.filter(
        (name) => name !== payload
      );
    })
    .addCase(actions.search, (state, { payload }) => {
      state.searchTerms = payload;
    })
    .addCase(actions.fetchLibrariesSucceeded, (state, { payload }) => {
      state.libraries = payload;
    })
);
