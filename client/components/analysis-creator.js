import React, { PropTypes } from 'react';

import '../styles/analysis-creator.scss';

let libraryInput = null;

function AnalysisCreator({ analyze }) {
  return (
    <form className="analysis-creator" onSubmit={event => {
      event.preventDefault();
      analyze(libraryInput.value.trim());
    }}>
      <input
        ref={element => {
          libraryInput = element;
        }}
        type="text"
        className="input analysis-creator__input"
        placeholder="redux@^3.6.0"
        autoCapitalize="off"
        autoComplete="off"
        spellCheck="false"
      />
      <button className="button analyzer__button" type="submit">Analyze</button>
    </form>
  );
}

AnalysisCreator.propTypes = {
  analyze: PropTypes.func.isRequired
};

export default AnalysisCreator;
