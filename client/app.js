import React, { Component } from 'react'
import libraries from './libraries'
import LibraryList from './library-list'

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="title">Lib sizes</h1>
        <p>Minfied sizes generated with uglify-js with compress and mangle on</p>
        <LibraryList libraries={libraries}/>
        <p className="footer-text">{String.fromCharCode(169)} Niels Gerritsen 2015</p>
      </div>
    )
  }
}
