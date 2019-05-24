import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/analysis';
import { Analyses, AnalysisCreator } from '../components';

function Analyzer({ analyze, analyses, inputAnalysisLibrary, libraryInput }) {
  return (
    <div>
      <AnalysisCreator
        analyze={analyze}
        inputAnalysisLibrary={inputAnalysisLibrary}
        libraryInput={libraryInput}
      />
      <Analyses analyses={analyses} />
    </div>
  );
}

Analyzer.propTypes = {
  analyses: PropTypes.arrayOf(PropTypes.object).isRequired,
  analyze: PropTypes.func.isRequired,
  inputAnalysisLibrary: PropTypes.func.isRequired,
  libraryInput: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return state.analysis;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analyzer);
