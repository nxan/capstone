import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getVideo } from 'services/video'
import { loadProfile } from 'services/user'
import actions from './actions'

// import * as selectors from './selectors';

export function* LOAD_VIDEO() {
    // const shopUrl = yield select(selectors.shopUrl)
    const video = yield call(getVideo)
    yield put({
        type: 'video/SET_STATE',
        payload: {
            video,
        },
    })
}

// export function* LOAD_HEATMAP() {
//     // const shopUrl = "capstonefpt.myshopify.com"
//     // console.log("shopnef".concat(shopUrl));
//     const shopUrl = yield select(selectors.shopUrl)
//     const heatmap = yield call(getHeatMap, shopUrl)
//     yield put({
//         type: 'video/SET_STATE',
//         payload: {
//             heatmap,
//         },
//     })
// }

export function* LOAD_CURRENT_ACCOUNT() {
    yield put({
        type: 'video/SET_STATE',
        payload: {
            loading: true,
        },
    })
    const response = yield call(loadProfile)
    if (response) {
        yield put({
            type: 'video/SET_STATE',
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
            type: 'video/LOAD_VIDEO',
        })
    }
    yield put({
        type: 'video/SET_STATE',
        payload: {
            loading: false,
        },
    })
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOAD_VIDEO, LOAD_VIDEO),
        // takeEvery(actions.LOAD_HEATMAP, LOAD_HEATMAP),
        takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
        LOAD_CURRENT_ACCOUNT(),
    ])
}
