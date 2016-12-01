import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sortLibraries, searchLibraries, markUsedLibraries, calculateTotals } from '../helpers';
import * as actions from '../actions';
import LibraryList from './library-list';
import Header from './header';
import Analyzer from './analyzer';

import '../styles/app.scss';

function App({ libraries, libraryCount, search, searchTerms, sort, sortBy, sortReversed, stopUsing, totals, use }) {
  const libraryListProps = { libraries, search, searchTerms, sort, sortBy, sortReversed, stopUsing, totals, use };
  return (
    <div>
      <Header libraryCount={libraryCount}/>
      <Analyzer/>
      <div className="container-fluid">
        <LibraryList {...libraryListProps}/>
        <p className="note">
          *Sizes may vary according to bundler, minifier and their settings.
          Here, minified sizes are generated using Webpack with the UglifyJS plugin.</p>
        <a
          className="footer__github-link"
          href="https://github.com/ngerritsen/libsizes"
          target="_blank"
          title="Check out the Github repository"
        >
          <i className="mega-octicon octicon-mark-github"/> View on Github
        </a>
        <p className="footer-text">{String.fromCharCode(169)} Niels Gerritsen 2015</p>
      </div>
    </div>
  );
}

App.propTypes = {
  libraries: PropTypes.array.isRequired,
  libraryCount: PropTypes.number.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
