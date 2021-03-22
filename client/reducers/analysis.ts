import { createReducer } from "@reduxjs/toolkit";

import * as actions from "../actions";
import * as serverActions from "../../shared/actions";
import { Analysis, AnalysisStatus } from "../types";

type AnalysisState = {
  analyses: Analysis[];
  libraryInput: string;
};

const initialState: AnalysisState = {
  analyses: [],
  libraryInput: "",
};

export default createReducer<AnalysisState>(initialState, (builder) =>
  builder
    .addCase(actions.analyze, (state) => {
      state.libraryInput = "";
    })
    .addCase(actions.inputAnalysisLibrary, (state, { payload }) => {
      state.libraryInput = payload;
    })
    .addCase(
      serverActions.analysisRequested,
      (state, { payload: { id, libraryString } }) => {
        state.analyses.push(createAnalysis(id, libraryString));
      }
    )
    .addCase(
      serverActions.analysisStarted,
      (state, { payload: { id, version } }) => {
        state.analyses = updateAnalysis(state.analyses, id, {
          status: AnalysisStatus.Pending,
          version,
        });
      }
    )
    .addCase(
      serverActions.analysisSkipped,
      (state, { payload: { id, result, version } }) => {
        state.analyses = updateAnalysis(state.analyses, id, {
          status: AnalysisStatus.Skipped,
          result,
          version,
        });
      }
    )
    .addCase(
      serverActions.analysisProgressed,
      (state, { payload: { id, message } }) => {
        state.analyses = updateAnalysis(state.analyses, id, {
          status: AnalysisStatus.Skipped,
          message,
        });
      }
    )
    .addCase(
      serverActions.analysisSucceeded,
      (state, { payload: { id, result } }) => {
        state.analyses = updateAnalysis(state.analyses, id, {
          status: AnalysisStatus.Skipped,
          result,
        });
      }
    )
    .addCase(
      serverActions.analysisFailed,
      (state, { payload: { id, error } }) => {
        state.analyses = updateAnalysis(state.analyses, id, {
          status: AnalysisStatus.Skipped,
          error,
        });
      }
    )
);

function createAnalysis(id: string, libraryString: string): Analysis {
  return {
    status: AnalysisStatus.Waiting,
    libraryString,
    error: null,
    version: null,
    message: "Waiting for server...",
    result: null,
    id,
  };
}

function updateAnalysis(
  analyses: Analysis[],
  id: string,
  updates: Record<string, unknown>
): Analysis[] {
  return analyses.map((analysis) => {
    if (analysis.id === id) {
      return {
        ...analysis,
        ...updates,
      };
    }

    return analysis;
  });
}
