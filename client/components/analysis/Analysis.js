import React from "react";
import PropTypes from "prop-types";
import * as constants from "../../constants";
import { resultToMessage } from "../../helpers";

import "../../styles/analysis/analysis.scss";

const statusClassMap = {
  [constants.ANALYSIS_STATUS_WAITING]: "waiting",
  [constants.ANALYSIS_STATUS_PENDING]: "pending",
  [constants.ANALYSIS_STATUS_SUCCEEDED]: "succeeded",
  [constants.ANALYSIS_STATUS_SKIPPED]: "skipped",
  [constants.ANALYSIS_STATUS_FAILED]: "failed",
};

const statusIconMap = {
  [constants.ANALYSIS_STATUS_WAITING]: "circle-o-notch",
  [constants.ANALYSIS_STATUS_PENDING]: "circle-o-notch fa-spin",
  [constants.ANALYSIS_STATUS_SUCCEEDED]: "check",
  [constants.ANALYSIS_STATUS_SKIPPED]: "check",
  [constants.ANALYSIS_STATUS_FAILED]: "times",
};

const Analysis = ({
  id,
  error,
  message,
  result,
  status,
  libraryString,
  version,
}) => {
  return (
    <li key={id} className="analysis">
      <h2
        className={`analysis__title analysis__title--${statusClassMap[status]}`}
      >
        <span className="analysis__icon-container">
          <i
            className={`analysis__status-icon fa fa-${statusIconMap[status]}`}
          />
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
}

Analysis.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  libraryString: PropTypes.string.isRequired,
  message: PropTypes.string,
  result: PropTypes.shape({
    normal: PropTypes.number.isRequired,
    minified: PropTypes.number.isRequired,
    gzipped: PropTypes.number.isRequired,
  }),
  status: PropTypes.string.isRequired,
  version: PropTypes.string,
};

export default Analysis;
