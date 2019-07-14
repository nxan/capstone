import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { notification } from 'antd'
import { login, register, loadProfile, logout } from 'services/user'
import { getSession, getVisitor, getAvgDurationSession, getTotalPageView,
    getAcquistionSocial, getAcquistionSearch, getAcquistionDirect, getAcquistionOther,
    getDeviceDesktop, getDeviceMobile, getDeviceTablet, getDeviceOther, getNewVisiorLastWeek,
    getOldVisiorLastWeek
} from 'services/dashboard'
import { push } from 'react-router-redux';
import actions from './actions'
import * as selectors from './selectors';

export function* LOGIN({ payload }) {
    const { email, password } = payload
    yield put({
        type: 'user/SET_STATE',
        payload: {
            token: localStorage.getItem('token'),
            loading: true,
        },
    })
    const success = yield call(login, email, password)
    if (success) {
        localStorage.setItem('token', success.token);
        console.log(success.token);
        notification.success({
            message: 'Logged In',
            description: 'You have successfully logged in to Shopify Analytics!',
        })
        yield put({
            type: 'user/LOAD_CURRENT_ACCOUNT',
        })


    }
}

export function* REGISTER({ payload }) {
    const { email, password, shop } = payload
    yield put({
        type: 'user/SET_STATE',
        payload: {
            loading: true,
        },
    })
    const success = yield call(register, email, password, shop)
    if (success) {
        notification.success({
            message: 'Registered',
            description: 'You have successfully logged in to Shopify Analytics!',
        })
        yield put(push('/user/login'));
    }
}

export function* LOAD_CURRENT_ACCOUNT() {
    yield put({
        type: 'user/SET_STATE',
        payload: {
            loading: true,
        },
    })
    const response = yield call(loadProfile)    
    if (response) {
        yield put({
            type: 'user/SET_STATE',
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
            type: 'user/LOAD_DASHBOARD',            
        })
    }
    yield put({
        type: 'user/SET_STATE',
        payload: {
            loading: false,
        },
    })    
}

export function* LOGOUT() {
    yield call(logout)
    yield put({
        type: 'user/SET_STATE',
        payload: {
            name: '',
            role: '',
            email: '',
            authorized: false,
            loading: false,
        },
    })
}

export function* LOAD_DASHBOARD() {
    const shopUrl = yield select(selectors.shopUrl);
    const session = yield call(getSession, shopUrl);
    const visitor = yield call(getVisitor, shopUrl);
    const avgDurationSession = yield call(getAvgDurationSession, shopUrl)    
    const pageview = yield call(getTotalPageView, shopUrl)
    const acquistionSocial = yield call(getAcquistionSocial, shopUrl)
    const acquistionSearch = yield call(getAcquistionSearch, shopUrl)
    const acquistionDirect = yield call(getAcquistionDirect, shopUrl)
    const acquistionOther = yield call(getAcquistionOther, shopUrl)
    const deviceDesktop = yield call(getDeviceDesktop, shopUrl)
    const deviceMobile = yield call(getDeviceMobile, shopUrl)
    const deviceTablet = yield call(getDeviceTablet, shopUrl)
    const deviceOther = yield call(getDeviceOther, shopUrl)   
    const newVisitorLastWeek = yield call(getNewVisiorLastWeek, shopUrl); 
    const oldVisitorLastWeek = yield call(getOldVisiorLastWeek, shopUrl);     
    yield put({
        type: 'user/SET_STATE',
        payload: {
            session,
            visitor,
            avgDurationSession,
            pageview,
            acquistionSocial,
            acquistionSearch,
            acquistionDirect,
            acquistionOther,
            deviceDesktop, 
            deviceMobile,
            deviceTablet,
            deviceOther,
            newVisitorLastWeek,
            oldVisitorLastWeek,
        },
    })
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOGIN, LOGIN),
        takeEvery(actions.REGISTER, REGISTER),
        takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
        takeEvery(actions.LOAD_DASHBOARD, LOAD_DASHBOARD),
        takeEvery(actions.LOGOUT, LOGOUT),
        LOAD_CURRENT_ACCOUNT(),
    ])
}
