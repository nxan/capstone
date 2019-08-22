import actions from './actions'

const initialState = {
    visitorLastWeek: [],
    visitorByDate:[],
    acquistionSocial: 0,
    acquistionSearch: 0,
    acquistionDirect: 0,
    acquistionOther: 0,
    acquistionTable: [],
    visitorLastMonth: [],
    labels:[
        '7 day ago',
        '6 day ago',
        '5 day ago',
        '4 day ago',
        '3 day ago',
        '2 day ago',
        'Yesterday',
      ]
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
