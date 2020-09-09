import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import configureStore from './store/store';
import { SnackbarProvider } from 'notistack';

const store = configureStore();

ReactDOM.render(
  <>
    <Provider store={store}>
      <SnackbarProvider maxSnack={5}>
        <App />
      </SnackbarProvider>
    </Provider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept();
}
