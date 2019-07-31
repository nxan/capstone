import actions from './actions'

const initialState = {
    behavior:[],
    mostProduct:[]
}

export default function behaviorReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}