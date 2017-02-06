import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import createLoggerMiddleware from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from './reducers';
import sagas from './sagas';

export default function configureStore(history){
  const
    reducers = connectRouter(history)(rootReducer),
    saga = createSagaMiddleware(),
    logger = createLoggerMiddleware(),
    middleware = applyMiddleware(routerMiddleware(history), logger, saga),
    devTools = window.devToolsExtension ? window.devToolsExtension() : f => f,
    store = createStore(reducers, compose(middleware, devTools));
  saga.run(sagas);
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
