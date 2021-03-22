import { createAction } from "@reduxjs/toolkit";
import { AnalyzedLibrary } from "../shared/types";

export const analyze = createAction<string>("analysis/analyze");
export const failedAnalysisAttempt = createAction("analysis/failedAttempt");
export const inputAnalysisLibrary = createAction<string>(
  "analysis/inputLibrary"
);

export const sort = createAction<string>("libraries/sort");
export const use = createAction<string>("libraries/use");
export const stopUsing = createAction<string>("libraries/stopUsing");
export const search = createAction<string>("libraries/search");
export const fetchLibrariesSucceeded = createAction<AnalyzedLibrary[]>(
  "libraries/fetchSucceeded"
);
