import actions from './actions'

const initialState = {
  video: [],
}

export default function videoReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
