import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import {
    getAcquistionSocial, getAcquistionSearch, getAcquistionDirect, getAcquistionOther,
    getVisitorLastWeek, getAcquistionTable, getVisitorLastMonth, getVisitorByDate
} from 'services/dashboard'
import { loadProfile } from 'services/user'
import actions from './actions'
import * as selectors from './selectors';

export function* LOAD_ACQUISTION() {
    const shopUrl = yield select(selectors.shopUrl);
    const acquistionSocial = yield call(getAcquistionSocial, shopUrl)
    const acquistionSearch = yield call(getAcquistionSearch, shopUrl)
    const acquistionDirect = yield call(getAcquistionDirect, shopUrl)
    const acquistionOther = yield call(getAcquistionOther, shopUrl)
    const visitorLastWeek = yield call(getVisitorLastWeek, shopUrl)
    const visitorLastMonth = yield call(getVisitorLastMonth, shopUrl)
    const acquistionTable = yield call(getAcquistionTable, shopUrl)
    yield put({
        type: 'acquistion/SET_STATE',
        payload: {
            visitorLastWeek,
            acquistionSocial,
            acquistionSearch,
            acquistionDirect,
            acquistionOther,
            acquistionTable,
            visitorLastMonth
        },
    })
}
export function* LOAD_ACQUISTION_DATE({payload}) {
    const { startValue, endValue } = payload
    const labels = []
    const start = new Date(startValue);
    const end = new Date(endValue);
    let loop = new Date(start);
    const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
    while (loop <= end) {        
        const day = `${months[loop.getMonth()]}/${loop.getDate()}`
        labels.push(day)
        const newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
    const shopUrl = yield select(selectors.shopUrl);
    const visitorLastWeek = yield call(getVisitorByDate, shopUrl, startValue, endValue)
    yield put({
        type: 'acquistion/SET_STATE',
        payload: {
            labels,
            visitorLastWeek
        },
    })
}


export function* LOAD_CURRENT_ACCOUNT() {
    yield put({
        type: 'acquistion/SET_STATE',
        payload: {
            loading: true,
        },
    })
    const response = yield call(loadProfile)
    if (response) {
        yield put({
            type: 'acquistion/SET_STATE',
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
            type: 'acquistion/LOAD_ACQUISTION',
        })
    }
    yield put({
        type: 'acquistion/SET_STATE',
        payload: {
            loading: false,
        },
    })
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOAD_ACQUISTION, LOAD_ACQUISTION),
        takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
        takeEvery(actions.LOAD_ACQUISTION_DATE, LOAD_ACQUISTION_DATE),
        LOAD_CURRENT_ACCOUNT(),
    ])
}
