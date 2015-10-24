import React, { Component, PropTypes } from 'react'

export default class LibraryRow extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    normal: PropTypes.number.isRequired,
    version: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    mingzip: PropTypes.number.isRequired,
    onUse: PropTypes.func.isRequired
  }

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
        <td>{name}</td>
        <td>{version}</td>
        <td>{normal} <span className="unit">kB</span></td>
        <td>{min} <span className="unit">kB</span></td>
        <td>{mingzip} <span className="unit">kB</span></td>
      </tr>
    )
  }
}
