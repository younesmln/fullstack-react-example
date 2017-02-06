import { createSelector } from 'reselect';
import { required } from '../utils/validation';

const authState = (state) => state.auth;

export const loggedIn = createSelector(authState, (auth) => {
  return !required(auth.get('currentUser'))
});

export const userSelector = createSelector(authState, (auth) => auth.get("currentUser"));