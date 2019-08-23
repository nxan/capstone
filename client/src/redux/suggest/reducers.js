import actions from './actions'

const initialState = {
    mostProduct:[],
    lessProduct:[],
    hours:[],
    boucerate:[]
}

export default function suggestReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload }
        default:
            return state
    }
}