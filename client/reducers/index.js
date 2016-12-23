import { combineReducers } from 'redux'

import analysis from './analysis'
import libraries from './libraries'

export default combineReducers({
  analysis,
  libraries
})
