import actions from './actions'

const initialState = {
  name: '',
  shopUrl: '',
  shopName: '',
  role: '',
  email: '',
  authorized: false,
  loading: false,
  newVisitorLastWeek: [],
  oldVisitorLastWeek: [],
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
