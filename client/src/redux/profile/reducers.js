import actions from './actions'

const initialState = {
  name: '',
  shopUrl: '',
  shopName: '',
  role: '',
  email: '',
  password: '',
  loading: false,
}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
