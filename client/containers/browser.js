import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { sortLibraries, searchLibraries, markUsedLibraries, calculateTotals, collapseLibraries } from '../helpers'
import * as actions from '../actions/libraries'
import { LibraryList, LibrarySearch, AnalyzerNotice } from '../components'

function Browser({ libraries, search, searchTerms, sort, sortBy, sortReversed, stopUsing, totals, use }) {
  const libraryListProps = { libraries, sort, sortBy, sortReversed, stopUsing, totals, use }
  return (
    <div>
      <LibrarySearch search={search} searchTerms={searchTerms}/>
      {libraries.length > 0 && <LibraryList {...libraryListProps}/>}
      <AnalyzerNotice subject="library"/>
    </div>
  )
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
}

function mapStateToProps({ libraries }) {
  const markedLibraries = markUsedLibraries(libraries.libraries, libraries.usedLibraries)
  const markedCollapsedLibraries = collapseLibraries(markedLibraries)
  const markedSearchedLibraries = searchLibraries(markedCollapsedLibraries, libraries.searchTerms)
  const markedSearchedAndSortedLibraries = sortLibraries(
    markedSearchedLibraries,
    libraries.sortBy,
    libraries.sortReversed
  )

  return {
    libraries: markedSearchedAndSortedLibraries,
    libraryCount: libraries.libraries.length,
    searchTerms: libraries.searchTerms,
    sortBy: libraries.sortBy,
    sortReversed: libraries.sortReversed,
    totals: calculateTotals(markedLibraries)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser)
