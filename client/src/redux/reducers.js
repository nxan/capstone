import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import acquistion from './acquistion/reducers'
import audience from './audience/reducers'
import profile from './profile/reducers'


export default history =>
    combineReducers({
        router: connectRouter(history),
        user,
        menu,
        settings,
        acquistion,
        audience,
        profile
    })
