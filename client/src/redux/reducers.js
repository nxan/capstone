import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import video from './video/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import profile from './profile/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    video,
    settings,
    profile,
  })
