import { fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import uiSaga from './uiSaga';
import websocketSaga from './websocketSaga';

export default function* () {
  yield [
    fork(authSaga),
    fork(uiSaga),
    fork(websocketSaga)
  ];
}
