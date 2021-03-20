import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "../../styles/analysis/analyzer-notice.scss";

function AnalyzerNotice({ subject }) {
  return (
    <p className="analyzer-notice">
      Did not find the {subject} you were looking for? Analyze it!
      <br />
      <Link to="/analyze" className="analyzer-notice__button button">
        Analyze
      </Link>
    </p>
  );
}

AnalyzerNotice.propTypes = {
  subject: PropTypes.string.isRequired,
};

export default AnalyzerNotice;