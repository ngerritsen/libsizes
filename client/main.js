import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

import './styles/global.scss'

var container = document.createElement('div')
container.setAttribute('id', 'app-container')

document.body.appendChild(container)

ReactDOM.render(
  <App/>,
  document.getElementById('app-container')
)
