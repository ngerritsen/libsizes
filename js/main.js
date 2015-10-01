import React from 'react'
import LibraryList from './library-list'
import libraries from './libraries'

React.render(
  <LibraryList libraries={libraries}/>,
  document.getElementById('app-container')
)
