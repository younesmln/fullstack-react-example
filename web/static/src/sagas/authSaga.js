import {takeLatest, put, takeEvery} from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import {
  SIGNUP_START, SIGNUP_SUCCEED, signUpSucceed, LOGIN_START,
  loginSucceed, LOGIN_SUCCEED, resourceLoaded, logout, LOGOUT }
from '../reducers/authReducer';
import { APP_LOAD, appLoadingFailed, showNotification } from '../reducers/uiReducer';
import { HTTPError } from '../utils/helpers';
import auth from '../utils/api/auth';
import { push } from 'connected-react-router'

function *register(action){
  try {
    const result = yield auth.signUp(action.payload);
    yield put(signUpSucceed(result));
    yield put(push('/login'));
    yield put(showNotification({type: 'success', text: 'register successfully'}));
  } catch (e){
    if (e instanceof HTTPError){
      let {errors} = yield e.response.json();
      yield action.meta.reject(new SubmissionError(errors));
    } else {
      console.log(e);
    }
  }
}

function *login(action){
  try {
    const result = yield auth.login(action.payload);
    yield put(loginSucceed(result));
    yield put(push('/'));
    yield put(showNotification({type: 'success', text: 'login successfully'}));
  } catch (e){
    console.log(e);
    console.log(e);
    yield action.meta.reject(new SubmissionError({}));
    /*if (e instanceof HTTPError){

    } else {
      console.log(e);
    }*/
  }
}

function *saveToken(action) {
  //console.log(`saveToken: ${JSON.stringify(action.payload.token)}`);
  localStorage.setItem("token", action.payload.token);
}

function* appLoad() {
  const token = localStorage.getItem("token");
  if (token){
    try {
      const result = yield auth.checkToken(token);
      yield put(resourceLoaded(result));
      yield put(push('/'));
    } catch (e){
      console.log(e);
      yield put(appLoadingFailed());
    }
  } else {
    yield put(appLoadingFailed());
  }
}

function* logoutSaga() {
  console.log("logout");
  localStorage.removeItem("token")
}

function *checkToken() {
  const token = localStorage.getItem('token');
  if (!token) yield put(logout());
}

export default function* authSaga() {
  yield [
    takeLatest(SIGNUP_START, register),
    takeLatest(LOGIN_START, login),
    takeLatest([SIGNUP_SUCCEED, LOGIN_SUCCEED], saveToken),
    takeLatest(APP_LOAD, appLoad),
    takeLatest(LOGOUT, logoutSaga),
    takeEvery(action => action.type != LOGOUT, checkToken)
  ]
}