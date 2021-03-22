import React from "react";
import { resultToMessage } from "../../helpers";

import "../../styles/analysis/analysis.scss";
import { AnalysisStatus } from "../../types";
import { Sizes } from "../../../shared/types";

const statusClassMap = {
  [AnalysisStatus.Waiting]: "waiting",
  [AnalysisStatus.Pending]: "pending",
  [AnalysisStatus.Succeeded]: "succeeded",
  [AnalysisStatus.Skipped]: "skipped",
  [AnalysisStatus.Failed]: "failed",
};

const statusIconMap = {
  [AnalysisStatus.Waiting]: "circle-o-notch",
  [AnalysisStatus.Pending]: "circle-o-notch fa-spin",
  [AnalysisStatus.Succeeded]: "check",
  [AnalysisStatus.Skipped]: "check",
  [AnalysisStatus.Failed]: "times",
};

type AnalysisProps = {
  error: string;
  id: string;
  libraryString: string;
  message: string;
  result: Sizes;
  status: string;
  version: string;
};

const Analysis = ({
  id,
  error,
  message,
  result,
  status,
  libraryString,
  version,
}: AnalysisProps): JSX.Element => (
  <li key={id} className="analysis">
    <h2
      className={`analysis__title analysis__title--${statusClassMap[status]}`}
    >
      <span className="analysis__icon-container">
        <i className={`analysis__status-icon fa fa-${statusIconMap[status]}`} />
      </span>
      {libraryString}
    </h2>
    <p className="analysis__main-info">
      <span className="analysis__version">
        Exact version: {version || "???"}
      </span>
      <br />
      {error || resultToMessage(result) || message}
    </p>
  </li>
);

export default Analysis;
