import React, { PropTypes } from 'react';
import * as constants from '../constants';

import '../styles/analysis.scss';

const statusClassMap = {
  [constants.ANALYSIS_STATUS_WAITING]: 'waiting',
  [constants.ANALYSIS_STATUS_PENDING]: 'pending',
  [constants.ANALYSIS_STATUS_SUCCEEDED]: 'succeeded',
  [constants.ANALYSIS_STATUS_FAILED]: 'failed'
};

const statusIconMap = {
  [constants.ANALYSIS_STATUS_WAITING]: 'circle-o-notch',
  [constants.ANALYSIS_STATUS_PENDING]: 'circle-o-notch fa-spin',
  [constants.ANALYSIS_STATUS_SUCCEEDED]: 'check',
  [constants.ANALYSIS_STATUS_FAILED]: 'times'
};

function Analysis({ id, error, status, libraryString }) {
  return (
    <li key={id} className="analysis">
    {error && <span className="analysis__error">{error}</span>}
      <i className={`analysis__status analysis__status--${statusClassMap[status]}`}/>
      <span className="analysis__status-icon-container">
        <i className={`
          analysis__status-icon analysis__status-icon--${statusClassMap[status]}
          fa fa-${statusIconMap[status]}
        `}/>
      </span>
      {libraryString}
    </li>
  );
}

Analysis.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  libraryString: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

module.exports = Analysis;
