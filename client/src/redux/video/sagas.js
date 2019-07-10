import { all, takeEvery, put, call } from 'redux-saga/effects'
import { getVideo } from 'services/video'
import actions from './actions'

export function* LOAD_VIDEO() {
    const video = yield call(getVideo)
    yield put({
        type: 'video/SET_STATE',
        payload: {
            video,
        },
    })
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.LOAD_VIDEO, LOAD_VIDEO),
        LOAD_VIDEO()
    ])
}
