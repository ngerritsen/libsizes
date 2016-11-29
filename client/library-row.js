import React, { Component, PropTypes } from 'react'

import './styles/library-row.scss';

class LibraryRow extends Component {
  constructor(props, context) {
    super(props, context)
    this._handleUse = this._handleUse.bind(this)
  }

  _handleUse() {
    const { onUse, name } = this.props
    const used = this.refs.used.checked

    onUse(name, used)
  }

  render() {
    const { name, normal, min, mingzip, version } = this.props

    return (
      <tr>
        <td><input type="checkbox" onChange={this._handleUse} ref="used"></input></td>
        <td><a target="_blank" href={`http://npmjs.com/package/${name}`}>{name}</a></td>
        <td className="version hide-mobile">{version}</td>
        <td>{normal} <span className="unit">kB</span></td>
        <td>{min} <span className="unit">kB</span></td>
        <td>{mingzip} <span className="unit">kB</span></td>
      </tr>
    )
  }
}

LibraryRow.propTypes = {
  name: PropTypes.string.isRequired,
  normal: PropTypes.number.isRequired,
  version: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  mingzip: PropTypes.number.isRequired,
  onUse: PropTypes.func.isRequired
}

export default LibraryRow;
