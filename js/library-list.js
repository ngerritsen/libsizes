import React, { Component } from 'react'

export default class LibraryList extends Component {
  static propTypes = {
    libraries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  }

  render() {
    return (
      <ul>
        {this.props.libraries.map((lib) =>
          <li>
            <strong>{lib.name}: </strong>
            ({lib.normal}KB / {lib.minified}KB / {lib.mingzip}KB )
          </li>
        )}
      </ul>
    )
  }
}
