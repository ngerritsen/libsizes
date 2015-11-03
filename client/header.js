import React from 'react'
import libraries from './libraries'

import './styles/header.scss'

export default () => (
  <div className="header">
    <div className="container-fluid">
      <h1 className="header--title">libsizes</h1>
      <p className="header--quote">
        {libraries.length} library sizes generated from package.json
        <span className="seperator"></span>
        <a className="header--github-link" href="https://github.com/ngerritsen/libsizes" target="_blank" title="Check out the Github repository">
          <span className="octicon octicon-mark-github"></span> View on Github
        </a>
      </p>

    </div>
  </div>
)
