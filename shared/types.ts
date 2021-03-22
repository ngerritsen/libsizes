export type Sizes = {
  normal: number;
  minified: number;
  gzipped: number;
};

export interface Library {
  name: string;
  version: string;
}

export interface AnalyzedLibrary extends Library, Sizes {
  request: string;
  timestamp: string;
  analysis: string;
}
