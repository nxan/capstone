import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import video from './video/sagas'
import settings from './settings/sagas'
import profile from './profile/sagas'

export default function* rootSaga() {
  yield all([user(), menu(), settings(), video(), profile()])
}
