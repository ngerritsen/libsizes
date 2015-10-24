import { List } from 'immutable'
import React, { Component, PropTypes } from 'react'
import LibraryRow from './library-row'

export default class LibraryList extends Component {
  static propTypes = {
    libraries: PropTypes.arrayOf(React.PropTypes.object).isRequired
  }

  constructor(props, context) {
    super(props, context)
    this._handleUseLibrary = this._handleUseLibrary.bind(this)
    this.state = { libraries: List(props.libraries) }
  }

  _handleUseLibrary(name, used) {
    const libraries = this.state.libraries.map((lib) => {
      if (lib.name === name) {
        return Object.assign({}, lib, { used })
      }
      return lib
    })
    this.setState({ libraries })
  }

  _calcTotals() {
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

    return (
      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th>Use</th>
            <th>Name</th>
            <th>Version</th>
            <th>Size</th>
            <th>Minified</th>
            <th>Min + gzip</th>
          </tr>
        </thead>
        <tbody>
          {this.state.libraries.map((lib) =>
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
            <td>{normal} <span className="unit">kB</span></td>
            <td>{min} <span className="unit">kB</span></td>
            <td>{mingzip} <span className="unit">kB</span></td>
          </tr>
        </tfoot>
      </table>
    )
  }
}
