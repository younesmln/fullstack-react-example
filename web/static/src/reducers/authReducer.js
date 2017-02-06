import { fromJS } from 'immutable';

export const SIGNUP_SUCCEED = "auth/SIGNUP_SUCCEED";
export const SIGNUP_FAILED = "auth/SIGNUP_FAILED";
export const SIGNUP_START = "auth/SIGNUP_START";
export const LOGIN_SUCCEED = "auth/LOGIN_SUCCEED";
export const LOGIN_FAILED = "auth/LOGIN_FAILED";
export const LOGIN_START = "auth/LOGIN_START";
export const LOGOUT = 'auth/LOGOUT';
export const RESOURCE_LOADED = "app/RESOURCE_LOADED";

export function signupStart(values, {resolve, reject}){
  return {
    type: SIGNUP_START,
    payload: values,
    meta: {resolve, reject}
  };
}

export function loginStart(values, {resolve, reject}) {
  return {
    type: LOGIN_START,
    payload: values,
    meta: {resolve, reject}
  }
}

export function loginSucceed(result) {
  return {
    type: LOGIN_SUCCEED,
    payload: result
  }
}

export function signUpSucceed(result) {
  console.log(result);
  return {
    type: SIGNUP_SUCCEED,
    payload: result
  }
}

export function resourceLoaded(user) {
  return {
    type: RESOURCE_LOADED,
    payload: {user}
  }
}

export function logout() {
  return { type: LOGOUT }
}

const initState = fromJS({currentUser: null});

export default function reducer(state = initState, action){
  const {type, payload} = action;
  switch (type) {
    case RESOURCE_LOADED:
    case LOGIN_SUCCEED:
      return state.set("currentUser", payload.user);
    case LOGOUT:
      return state.set("currentUser", null);
    default:
      return state
  }
}
