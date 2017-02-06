import { fromJS } from 'immutable';
import { RESOURCE_LOADED } from './authReducer';

//generic action used especially for checking token and load user if the token is valid
export const APP_LOAD = "app/APP_LOAD";
export const APP_LOADING_FAILED = "app/APP_LOADING_FAILED";
export const SHOW_NOTIFICATION = "app/SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "app/HIDE_NOTIFICATION";

export function firstLoad() {
  return { type: APP_LOAD }
}

export function appLoadingFailed() {
  return {type: APP_LOADING_FAILED}
}

export function showNotification({text, type}) {
  return {
    type: SHOW_NOTIFICATION,
    payload: {text, type}
  }
}

export function hideNotification() {
  return { type: HIDE_NOTIFICATION }
}

const initState = fromJS({loading: false, notification: {}});

export default function uiReducer(state = initState, action){
  const {type, payload} = action;
  switch (type){
    case APP_LOAD:
      return state.set("loading", true);
    case APP_LOADING_FAILED:
    case RESOURCE_LOADED:
      return state.set("loading", false);
    case SHOW_NOTIFICATION:
      return state.set("notification", fromJS(payload));
    case HIDE_NOTIFICATION:
      return state.set("notification", fromJS({}));
    default:
      return state;
  }
}