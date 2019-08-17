import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import acquistion from './acquistion/reducers'
import audience from './audience/reducers'
import profile from './profile/reducers'
import video from './video/reducers'
import behavior from './behavior/reducers'
import heatmap from './heatmap/reducers'
import suggest from './suggest/reducers'
import settings from './settings/reducers'

export default history =>
    combineReducers({
        router: connectRouter(history),
        user,
        menu,
        video,
        heatmap,
        acquistion,
        audience,
        profile,
        behavior,
        suggest,
        settings
    })
