import { createStore, applyMiddleware, compose } from 'redux';
// import promise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers/index';
import api from '../middleware/api';

const nextReducer = require('../reducers/index');

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, api),
    // applyMiddleware(promise),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
