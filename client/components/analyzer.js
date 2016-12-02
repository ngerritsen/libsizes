import React, { PropTypes } from 'react';

import * as constants from '../constants';

import '../styles/analyzer.scss';

let libraryInput = null;

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

function Analyzer({ analyze, analyses }) {
  return (
    <div className="analyzer">
      <p className="analyzer__text">Did not find what you were looking for? Analyze it:</p>
      <form className="analyzer__content" onSubmit={event => {
        event.preventDefault();
        analyze(libraryInput.value.trim());
      }}>
        <input
          ref={element => {
            libraryInput = element;
          }}
          type="text"
          className="analyzer__input"
          placeholder="redux@^3.6.0"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
        />
        <button className="analyzer__button" type="submit">Analyze</button>
      </form>

      <ul className="analyzer__analyses">
          {analyses.map(({ status, libraryString, id, error }) =>
            <li key={id} className="analyzer__analysis">
            {error && <span className="analyzer__analysis-error">{error}</span>}
              <i className={`analyzer__analysis-status analyzer__analysis-status--${statusClassMap[status]}`}/>
              <span className="analyzer__analysis-status-icon-container">
                <i className={`
                  analyzer__analysis-status-icon analyzer__analysis-status-icon--${statusClassMap[status]}
                  fa fa-${statusIconMap[status]}
                `}/>
              </span>
              {libraryString}
            </li>
          )}
      </ul>
    </div>
  );
}

Analyzer.propTypes = {
  analyses: PropTypes.arrayOf(PropTypes.object).isRequired,
  analyze: PropTypes.func.isRequired
};

export default Analyzer;
