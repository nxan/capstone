import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getVideo, getHeatMap } from 'services/video'
import actions from './actions'
// import * as selectors from '../acquistion/selectors';

export function* LOAD_VIDEO() {
    const video = yield call(getVideo)
    yield put({
        type: 'video/SET_STATE',
        payload: {
            video,
        },
    })
}

export function* LOAD_HEATMAP() {
    const shopUrl = "capstonefpt.myshopify.com"
    console.log("shopnef".concat(shopUrl));
    const heatmap = yield call(getHeatMap, shopUrl)
    yield put({
        type: 'video/SET_STATE',
        payload: {
            heatmap,
        },
    })
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOAD_VIDEO, LOAD_VIDEO),
        takeEvery(actions.LOAD_HEATMAP, LOAD_HEATMAP),
        LOAD_HEATMAP(),
        LOAD_VIDEO(),

    ])
}
