import { combineReducers } from 'redux'

import auth from './auth'
import notifications from './notifications'
import posts from './posts'

export default combineReducers({
  auth,
  notifications,
  posts,
})
