import actions from './actions'

const initialState = {
  heatmap: [],
  newHeatMap: []
}

export default function heatmapReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
