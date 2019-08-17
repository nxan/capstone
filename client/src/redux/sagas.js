import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import acquistion from './acquistion/sagas'
import audience from './audience/sagas'
import profile from './profile/sagas'
import video from './video/sagas'
import behavior from './behavior/sagas'
import heatmap from './heatmap/sagas'
import suggest from './suggest/sagas'
import settings from './settings/sagas'

export default function* rootSaga() {
  yield all([user(), menu(), video(), heatmap() , acquistion(), audience(), profile(),behavior(),suggest(),settings()])
}
