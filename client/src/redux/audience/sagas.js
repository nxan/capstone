import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import {
    getSession, getSessionsLastWeek, getVisitor, getNewVisitors, getAvgDurationSession,
    getTotalPageView, getOldVistor, getUserBrowser, getUserDevice, getUserOS, getSessionsLastMonth,
    getAudienceByDate, getBounceRate
} from 'services/dashboard'
import { loadProfile } from 'services/user'
import actions from './actions'
import * as selectors from './selectors';


export function* LOAD_AUDIENCE() {
    const shopUrl = yield select(selectors.shopUrl);
    const session = yield call(getSession, shopUrl);
    const sessionLastWeek = yield call(getSessionsLastWeek, shopUrl);
    const user = yield call(getVisitor, shopUrl);
    const newuser = yield call(getNewVisitors, shopUrl);
    const avgDuration = yield call(getAvgDurationSession, shopUrl);
    const pageView = yield call(getTotalPageView, shopUrl);
    const olduser = yield call(getOldVistor, shopUrl);
    const usrbrowser = yield call(getUserBrowser, shopUrl);
    const usrdev = yield call(getUserDevice, shopUrl);
    const usrOS = yield call(getUserOS, shopUrl);
    const sessionLastMonth = yield call(getSessionsLastMonth, shopUrl);
    const bounceRate = yield call(getBounceRate, shopUrl)
    yield put({
        type: 'audience/SET_STATE',
        payload: {
            loading: true,
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
            bounceRate
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

export function* LOAD_AUDIENCE_DATE({ payload }) {
    const { startTime, endTime } = payload
    const shopUrl = yield select(selectors.shopUrl);
    const result = yield call(getAudienceByDate, shopUrl, startTime, endTime)
    const avgDuration = result.avgDuration
    const newuser = result.newuser
    const olduser = result.olduser
    const pageView = result.pageView
    const session = result.session
    const usrOs = result.usrOs
    const usrbrowser = result.usrbrowser
    const usrdev = result.usrdev
    const user = result.user
    const sessionLastWeek = result.sessionLastWeek
    const bounceRate = result.bounceRate
    yield put({
        type: 'audience/SET_STATE',
        payload: {
            loading: true,
            avgDuration,
            newuser,
            olduser,
            pageView,
            session,
            usrOs,
            usrbrowser,
            usrdev,
            user,
            sessionLastWeek,
            bounceRate
        },
    })
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOAD_AUDIENCE, LOAD_AUDIENCE),
        takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
        takeEvery(actions.LOAD_AUDIENCE_DATE, LOAD_AUDIENCE_DATE),
        LOAD_CURRENT_ACCOUNT(),
    ])
}