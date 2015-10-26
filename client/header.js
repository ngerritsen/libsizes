import React from 'react'
import libraries from './libraries'

import './styles/header.scss'

export default () => (
  <div className="header">
    <div className="container-fluid">
      <h1 className="header--title">libsizes</h1>
      <p className="header--quote">{libraries.length} library sizes generated from package.json</p>
    </div>
  </div>
)
