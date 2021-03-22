import { AnalyzedLibrary } from "../shared/types";

export enum AnalysisStatus {
  Pending,
  Skipped,
  Succeeded,
  Waiting,
  Failed,
}

export type Analysis = {
  status: AnalysisStatus;
  libraryString: string;
  error: string | null;
  version: string | null;
  message: string;
  result: string | null;
  id: string;
};

export interface Library extends AnalyzedLibrary {
  used?: boolean;
  versions?: Library[];
}
