import React, { Component } from 'react'
import libraries from './libraries'
import LibraryList from './library-list'
import Header from './header'

import './styles/app.scss'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="container-fluid">
          <LibraryList libraries={libraries}/>
          <p className="note">
            *Sizes may vary according to bundler, minifier and their settings.
            Here, minified sizes are generated using Webpack with the UglifyJS plugin.</p>
          <a className="footer--github-link" href="https://github.com/ngerritsen/libsizes" target="_blank" title="Check out the Github repository">
            <span className="mega-octicon octicon-mark-github"></span> View on Github
          </a>
          <p className="footer-text">{String.fromCharCode(169)} Niels Gerritsen 2015</p>
        </div>
      </div>
    )
  }
}
