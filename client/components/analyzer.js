import React, { PropTypes } from 'react';

import '../styles/analyzer.scss';

let libraryInput = null;

function Analyzer({ analyze }) {
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
        />
        <button className="analyzer__button" type="submit">Analyze</button>
      </form>
    </div>
  );
}

Analyzer.propTypes = {
  analyze: PropTypes.func.isRequired
};

export default Analyzer;
