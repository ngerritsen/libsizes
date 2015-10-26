import { List } from 'immutable'
import React, { Component, PropTypes } from 'react'
import LibraryRow from './library-row'

import './styles/library-list.scss'

export default class LibraryList extends Component {
  static propTypes = {
    libraries: PropTypes.arrayOf(React.PropTypes.object).isRequired
  }

  constructor(props, context) {
    super(props, context)
    this._handleUseLibrary = this._handleUseLibrary.bind(this)
    this._handleSearch = this._handleSearch.bind(this)
    this._handleSortByName = this._handleSortByName.bind(this)
    this._handleSortByNormal = this._handleSortByNormal.bind(this)
    this._handleSortByMin = this._handleSortByMin.bind(this)
    this._handleSortByMinGzip = this._handleSortByMinGzip.bind(this)
    this.state = {
      libraries: List(props.libraries),
      searchValue: '',
      sortProp: 'name',
      sortInversed: false
    }
  }

  _handleUseLibrary (name, used) {
    const libraries = this.state.libraries.map((lib) => {
      if (lib.name === name) {
        return Object.assign({}, lib, { used })
      }
      return lib
    })
    this.setState({ libraries })
  }

  _handleSearch () {
    const searchValue = this.refs.searchInput.value
    const processedSearchValue = searchValue.trim().toLowerCase()

    if (processedSearchValue !== this.state.searchValue) {
      this.setState({ searchValue: processedSearchValue })
    }
  }

  _searchLibraries (libraries, searchValue) {
    return libraries.filter(lib => this._matchesSearchValue(lib.name, searchValue))
  }

  _matchesSearchValue (name, searchValue) {
    const processedName = name.toLowerCase()
    return processedName.indexOf(searchValue) !== -1
  }

  _handleSortByName () {
    const { sortProp, sortInversed } = this.state

    this.setState({
      sortProp: 'name',
      sortInversed: sortProp === 'name' && !sortInversed
    })
  }

  _handleSortByNormal () {
    const { sortProp, sortInversed } = this.state

    this.setState({
      sortProp: 'normal',
      sortInversed: sortProp === 'normal' && !sortInversed
    })
  }

  _handleSortByMin () {
    const { sortProp, sortInversed } = this.state

    this.setState({
      sortProp: 'min',
      sortInversed: sortProp === 'min' && !sortInversed
    })
  }

  _handleSortByMinGzip () {
    const { sortProp, sortInversed } = this.state

    this.setState({
      sortProp: 'mingzip',
      sortInversed: sortProp === 'mingzip' && !sortInversed
    })
  }

  _sortLibraries (libraries, sortProp) {
    const sortValue = libraries.get(0)[sortProp]

    if (typeof sortValue === 'string') {
      return libraries.sortBy(lib => lib[sortProp].toLowerCase())
    }

    return libraries.sortBy(lib => lib[sortProp])
  }

  _calcTotals () {
    return this.state.libraries
      .toIndexedSeq()
      .filter((lib) => lib.used)
      .reduce((prev, curr) =>  {
        return {
          normal: prev.normal + curr.normal,
          min: prev.min + curr.min,
          mingzip: prev.mingzip + curr.mingzip
        }
      }, { normal: 0, min: 0, mingzip: 0 })
  }

  render() {
    const { normal, min, mingzip } = this._calcTotals()
    const { searchValue, libraries, sortProp, sortInversed } = this.state

    const searchedLibraries =  this._searchLibraries(libraries, searchValue)
    let librariesToShow = this._sortLibraries(searchedLibraries, sortProp)

    if (sortInversed) {
      librariesToShow = librariesToShow.reverse()
    }

    return (
      <div>
        <input
          type="text"
          className="library-list--search"
          placeholder="Search"
          onChange={this._handleSearch}
          ref="searchInput"
          />

        <table className="library-list">
          <thead>
            <tr>
              <th><span className="hide-mobile">Use</span></th>
              <th className="sortable" onClick={this._handleSortByName}>
                Name
                <span className="sort-icon">
                  {sortProp === 'name' && sortInversed && String.fromCharCode(9660)}
                  {sortProp === 'name' && !sortInversed && String.fromCharCode(9650)}
                </span>
              </th>
              <th className="hide-mobile">Version</th>
              <th className="sortable" onClick={this._handleSortByNormal}>
                Size
                <span className="sort-icon">
                  {sortProp === 'normal' && sortInversed && String.fromCharCode(9660)}
                  {sortProp === 'normal' && !sortInversed && String.fromCharCode(9650)}
                </span>
              </th>
              <th className="sortable" onClick={this._handleSortByMin}>
                Minified*
                <span className="sort-icon">
                  {sortProp === 'min' && sortInversed && String.fromCharCode(9660)}
                  {sortProp === 'min' && !sortInversed && String.fromCharCode(9650)}
                </span>
              </th>
              <th className="sortable" onClick={this._handleSortByMinGzip}>
                <span className="hide-mobile">Min + </span>Gzip
                <span className="sort-icon">
                  {sortProp === 'mingzip' && sortInversed && String.fromCharCode(9660)}
                  {sortProp === 'mingzip' && !sortInversed && String.fromCharCode(9650)}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {librariesToShow.map((lib) =>
              <LibraryRow
                key = {lib.name}
                name = {lib.name}
                normal = {lib.normal}
                version = {lib.version}
                min = {lib.min}
                mingzip = {lib.mingzip}
                onUse = {this._handleUseLibrary}
              />
            )}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>Total</td>
              <td className="hide-mobile"></td>
              <td>{normal} <span className="unit">kB</span></td>
              <td>{min} <span className="unit">kB</span></td>
              <td>{mingzip} <span className="unit">kB</span></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}
