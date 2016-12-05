import React, { PropTypes } from 'react';
import * as constants from '../constants';
import { resultToMessage } from '../helpers';

import '../styles/analysis.scss';

const statusClassMap = {
  [constants.ANALYSIS_STATUS_WAITING]: 'waiting',
  [constants.ANALYSIS_STATUS_PENDING]: 'pending',
  [constants.ANALYSIS_STATUS_SUCCEEDED]: 'succeeded',
  [constants.ANALYSIS_STATUS_SKIPPED]: 'skipped',
  [constants.ANALYSIS_STATUS_FAILED]: 'failed'
};

const messageClassMap = {
  [constants.ANALYSIS_STATUS_FAILED]: 'error',
  [constants.ANALYSIS_STATUS_SUCCEEDED]: 'success',
  [constants.ANALYSIS_STATUS_SKIPPED]: 'skipped'
};

const statusIconMap = {
  [constants.ANALYSIS_STATUS_WAITING]: 'circle-o-notch',
  [constants.ANALYSIS_STATUS_PENDING]: 'circle-o-notch fa-spin',
  [constants.ANALYSIS_STATUS_SUCCEEDED]: 'check',
  [constants.ANALYSIS_STATUS_SKIPPED]: 'check',
  [constants.ANALYSIS_STATUS_FAILED]: 'times'
};

function Analysis({ id, error, message, result, status, libraryString }) {
  const messageToShow = error || resultToMessage(result) || message;
  const messageTypeClassName = messageClassMap[status] ? ' analysis__message--' + messageClassMap[status] : '';

  return (
    <li key={id} className="analysis">
      <span className={'analysis__message' + messageTypeClassName}>{messageToShow}</span>
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
  message: PropTypes.string,
  result: PropTypes.shape({
    normal: PropTypes.number.isRequired,
    minified: PropTypes.number.isRequired,
    gzipped: PropTypes.number.isRequired
  }),
  status: PropTypes.string.isRequired
};

module.exports = Analysis;
