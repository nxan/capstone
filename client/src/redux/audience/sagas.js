import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import {
    getSession, getSessionsLastWeek,getVisitor,getNewVisitors,getAvgDurationSession,
    getTotalPageView, getOldVistor,getUserBrowser,getUserDevice,getUserOS,getSessionsLastMonth
} from 'services/dashboard'
import { loadProfile } from 'services/user'
import actions from './actions'
import * as selectors from './selectors';


export function* LOAD_AUDIENCE() {
    const shopUrl = yield select(selectors.shopUrl);
    const session = yield call(getSession, shopUrl);
    const sessionLastWeek = yield call(getSessionsLastWeek, shopUrl);
    const user = yield call(getVisitor, shopUrl);
    const newuser = yield call(getNewVisitors,shopUrl);
    const avgDuration = yield call(getAvgDurationSession, shopUrl);
    const pageView= yield call(getTotalPageView,shopUrl);
    const olduser = yield call(getOldVistor,shopUrl);
    const usrbrowser = yield call(getUserBrowser,shopUrl);
    const usrdev = yield call(getUserDevice,shopUrl);
    const usrOS = yield call(getUserOS,shopUrl);
    const sessionLastMonth = yield call(getSessionsLastMonth,shopUrl);

    yield put({
        type: 'audience/SET_STATE',
        payload: {
            sessionLastWeek,
            session,
            user,
            newuser,
            avgDuration,
            pageView,
            olduser,
            usrbrowser,
            usrdev,
            usrOS,
            sessionLastMonth,
        },
    })
}

export function* LOAD_CURRENT_ACCOUNT() {
    yield put({
        type: 'audience/SET_STATE',
        payload: {
            loading: true,
        },
    })
    const response = yield call(loadProfile)
    if (response) {
        yield put({
            type: 'audience/SET_STATE',
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
            type: 'audience/LOAD_AUDIENCE',
        })
    }
    yield put({
        type: 'audience/SET_STATE',
        payload: {
            loading: false,
        },
    })
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOAD_AUDIENCE, LOAD_AUDIENCE),
        takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
        LOAD_CURRENT_ACCOUNT(),
    ])
}