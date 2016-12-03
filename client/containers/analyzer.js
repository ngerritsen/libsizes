import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import { Analyses, AnalysisCreator } from '../components';

function Analyzer({ analyze, analyses }) {
  return (
    <div>
      <AnalysisCreator analyze={analyze}/>
      <Analyses analyses={analyses}/>
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
