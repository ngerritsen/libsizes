import React from 'react';
import { Link } from 'react-router';

import '../styles/analyzer-notice.scss';

function AnalyzerNotice() {
  return (
    <p className="analyzer-notice">
      Did not find the library you were looking for? Analyze it!<br/>
      <Link to="/analyze" className="analyzer-notice__button button">Analyze</Link>
    </p>
  );
}

export default AnalyzerNotice;
