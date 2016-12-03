import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import { Analysis } from './index';

import '../styles/analyzer.scss';

let libraryInput = null;

function Analyzer({ analyze, analyses }) {
  return (
    <div className="analyzer">
      <form className="analyzer__content" onSubmit={event => {
        event.preventDefault();
        analyze(libraryInput.value.trim());
      }}>
        <input
          ref={element => {
            libraryInput = element;
          }}
          type="text"
          className="input analyzer__input"
          placeholder="redux@^3.6.0"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck="false"
        />
        <button className="button analyzer__button" type="submit">Analyze</button>
      </form>

      <ul className="analyzer__analyses">
          {analyses.map(analysis => <Analysis {...analysis}/>)}
      </ul>
    </div>
  );
}

Analyzer.propTypes = {
  analyses: PropTypes.arrayOf(PropTypes.object).isRequired,
  analyze: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    analyses: state.analyses
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Analyzer);
