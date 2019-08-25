import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { getHeatMap } from 'services/heatmap'
import { loadProfile } from 'services/user'
import actions from './actions'

import * as selectors from './selectors';

export function* LOAD_HEATMAP() {
    const shopUrl = yield select(selectors.shopUrl)
    const heatmap = yield call(getHeatMap, shopUrl)
    const newHeatMap = []
    // const id = heatmap.id
    // // eslint-disable-next-line camelcase
    // const page_url = heatmap.page_url
    // // eslint-disable-next-line camelcase
    // const shop_id = heatmap.shop_id
    yield put({
        type: 'heatmap/SET_STATE',
        payload: {
            heatmap,
            newHeatMap
        },
    })
}


export function* LOAD_CURRENT_ACCOUNT() {
    yield put({
        type: 'heatmap/SET_STATE',
        payload: {
            loading: true,
        },
    })
    const response = yield call(loadProfile)
    if (response) {
        yield put({
            type: 'heatmap/SET_STATE',
            payload: {
                name: response.user.name,
                email: response.user.email,
                shopName: response.name_shop,
                shopUrl: response.shop_url,
                role: 'admin',
                authorized: true,
            },
        })
        yield put({
            type: 'heatmap/LOAD_HEATMAP',
        })
    }
    yield put({
        type: 'heatmap/SET_STATE',
        payload: {
            loading: false,
        },
    })
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOAD_HEATMAP, LOAD_HEATMAP),
        takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
        LOAD_CURRENT_ACCOUNT(),
    ])
}
