import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { edit } from 'services/profile'
import { push } from 'react-router-redux';
import actions from './actions'

export function* EDIT({ payload }) {
    const { name, email, password } = payload
    yield put({
        type: 'profile/SET_STATE',
        payload: {
            loading: true,
        },
    })
    const response = yield call(edit, name, password, email)
    if (response) {
        notification.success({
            message: 'Change successfully',
            description: 'You have successfully change profile!',
        })
        yield put({
            type: 'user/SET_STATE',
            payload: {
                name,
            },
        })
        yield put(push('/profile'));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.EDIT, EDIT),
    ])
}


