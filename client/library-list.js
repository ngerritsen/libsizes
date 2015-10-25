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
    this.state = {
      libraries: List(props.libraries),
      searchValue: ''
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
    return libraries.filter((lib) => this._matchesSearchValue(lib.name, searchValue))
  }

  _matchesSearchValue (name, searchValue) {
    const processedName = name.toLowerCase()
    return processedName.indexOf(searchValue) !== -1
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
    const { searchValue, libraries } = this.state

    const librariesToShow =  this._searchLibraries(libraries, searchValue)

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
              <th>Use</th>
              <th>Name</th>
              <th>Version</th>
              <th>Size</th>
              <th>Minified*</th>
              <th>Min + gzip</th>
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
              <td></td>
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
