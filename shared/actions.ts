import { createAction } from "@reduxjs/toolkit";
import { Sizes } from "./types";

interface AnalysisPayload {
  id: string;
}

interface AnalysisRequest extends AnalysisPayload {
  libraryString: string;
}

interface AnalysisStarted extends AnalysisPayload {
  version: string;
}

interface AnalysisSkipped extends AnalysisPayload {
  version: string;
  result: Sizes;
}

interface AnalysisProgressed extends AnalysisPayload {
  message: string;
}

interface AnalysisSucceeded extends AnalysisPayload {
  result: Sizes;
}

interface AnalysisFailed extends AnalysisPayload {
  error: Error;
}

export const analysisRequested = createAction<AnalysisRequest>(
  "analysis/requested"
);

export const analysisStarted = createAction<AnalysisStarted>(
  "analysis/started"
);

export const analysisSkipped = createAction<AnalysisSkipped>(
  "analysis/skipped"
);

export const analysisProgressed = createAction<AnalysisProgressed>(
  "analysis/progressed"
);

export const analysisSucceeded = createAction<AnalysisSucceeded>(
  "analysis/succeeded"
);

export const analysisFailed = createAction<AnalysisFailed>("analysis/failed");
