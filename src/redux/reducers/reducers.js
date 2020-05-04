import { combineReducers } from 'redux'

import auth from './auth'
import notifications from './notifications'
import posts from './posts'
import crud from './crud'

export default combineReducers({
  auth,
  notifications,
  posts,
  crud,
})
