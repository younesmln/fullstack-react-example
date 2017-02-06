import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form';
import auth from './authReducer';
import ui from './uiReducer';

export default combineReducers({auth, ui, form});
