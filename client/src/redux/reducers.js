import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import acquistion from './acquistion/reducers'
import audience from './audience/reducers'
import profile from './profile/reducers'
import video from './video/reducers'

export default history =>
    combineReducers({
        router: connectRouter(history),
        user,
        menu,
        video,
        settings,
        acquistion,
        audience,
        profile
    })
