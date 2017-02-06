import { fork, take, put} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { NOTIFICATION_DELAY } from '../utils/config';
import { hideNotification, SHOW_NOTIFICATION } from '../reducers/uiReducer';

function* dismissNotifications() {
  while (true){
    yield take(SHOW_NOTIFICATION);
    yield delay(NOTIFICATION_DELAY);
    yield put(hideNotification())
  }
}

export default function* uiSaga() {
  yield [
    fork(dismissNotifications)
  ]
}