import React from "react";
import { Link } from "react-router-dom";

import "../../styles/analysis/analyzer-notice.scss";

type AnalyzerProps = {
  subject: string;
};

const AnalyzerNotice = ({ subject }: AnalyzerProps): JSX.Element => (
  <p className="analyzer-notice">
    Did not find the {subject} you were looking for? Analyze it!
    <br />
    <Link to="/analyze" className="analyzer-notice__button button">
      Analyze
    </Link>
  </p>
);

export default AnalyzerNotice;
