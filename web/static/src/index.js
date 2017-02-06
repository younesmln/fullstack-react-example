"use strict";
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import Main from './containers/main';
import configureStore  from './store';
import { firstLoad } from './reducers/uiReducer';

const history = createBrowserHistory();

const store = configureStore(history);

function render(){
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <Main />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
}

store.dispatch(firstLoad());

render();