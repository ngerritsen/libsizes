import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sortLibraries, searchLibraries, markUsedLibraries, calculateTotals } from '../helpers';
import * as actions from '../actions';
import { LibraryList } from './index';

function Browser({ libraries, search, searchTerms, sort, sortBy, sortReversed, stopUsing, totals, use }) {
  const libraryListProps = { libraries, search, searchTerms, sort, sortBy, sortReversed, stopUsing, totals, use };
  return (
    <div>
      <LibraryList {...libraryListProps}/>
      <p className="note">
        *Sizes may vary according to bundler, minifier and their settings.
        Here, minified sizes are generated using Webpack with the UglifyJS plugin.
      </p>
    </div>
  );
}

Browser.propTypes = {
  libraries: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
  searchTerms: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortReversed: PropTypes.bool.isRequired,
  stopUsing: PropTypes.func.isRequired,
  totals: PropTypes.object.isRequired,
  use: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const markedLibraries = markUsedLibraries(state.libraries, state.usedLibraries);
  const markedSearchedLibraries = searchLibraries(markedLibraries, state.searchTerms);
  const markedSearchedAndSortedLibraries = sortLibraries(markedSearchedLibraries, state.sortBy, state.sortReversed);

  return {
    libraries: markedSearchedAndSortedLibraries,
    libraryCount: state.libraries.length,
    searchTerms: state.searchTerms,
    sortBy: state.sortBy,
    sortReversed: state.sortReversed,
    totals: calculateTotals(markedLibraries)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
