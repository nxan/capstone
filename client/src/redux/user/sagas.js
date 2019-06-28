import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { login, register, loadProfile, logout } from 'services/user'
import { push } from 'react-router-redux';
import actions from './actions'

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
  const { email, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(register, email, password)
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

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.REGISTER, REGISTER),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
