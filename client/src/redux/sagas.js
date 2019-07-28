import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import acquistion from './acquistion/sagas'
import audience from './audience/sagas'
import profile from './profile/sagas'
import video from './video/sagas'

export default function* rootSaga() {
  yield all([user(), menu(), settings(), video(), acquistion(), audience(), profile()])
}
