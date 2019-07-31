import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { getBehavior } from 'services/behavior'
import { loadProfile } from 'services/user'
import actions from './actions'
import * as selectors from './selectors'

export function* LOAD_CURRENT_ACCOUNT() {
    yield put({
        type: 'behavior/SET_STATE',
        payload: {
            loading: true,
        },
    })
    const response = yield call(loadProfile)
    if (response) {
        yield put({
            type: 'behavior/SET_STATE',
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
            type: 'behavior/LOAD_BEHAVIOR',
        })
    }
    yield put({
        type: 'behavior/SET_STATE',
        payload: {
            loading: false,
        },
    })
}
export function* LOAD_BEHAVIOR() {
    const shopUrl = yield select(selectors.shopUrl);    
    console.log(shopUrl)
    const behavior = yield call(getBehavior, shopUrl);
    if (behavior) {        
        yield put({
            type: 'behavior/SET_STATE',
            payload: {
                behavior
            },
        })
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOAD_BEHAVIOR, LOAD_BEHAVIOR),
        takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
        LOAD_CURRENT_ACCOUNT(),
    ])
}


