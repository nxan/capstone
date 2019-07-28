import actions from './actions'

const initialState = {
    sessionLastWeek: [],
    usrbrowser:[],
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}