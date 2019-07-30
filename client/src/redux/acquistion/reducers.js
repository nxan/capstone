import actions from './actions'

const initialState = {
    visitorLastWeek: [],
    acquistionSocial: 0,
    acquistionSearch: 0,
    acquistionDirect: 0,
    acquistionOther: 0,
    acquistionTable: [],
    heatmap:[]
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
