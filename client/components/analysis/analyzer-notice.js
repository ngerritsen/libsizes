import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../../styles/analysis/analyzer-notice.scss';

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
  subject: PropTypes.string.isRequired
};

export default AnalyzerNotice;
