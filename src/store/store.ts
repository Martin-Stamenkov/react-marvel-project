/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, compose, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';

export const devtoolsCompose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  });
const composeEnhancers = devtoolsCompose || compose;

const middlewares: Middleware[] = [thunk];

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return store;
}
