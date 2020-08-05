import React from 'react';
import MenuAppBar from 'components/layouts/AppBar';
import MainContent from 'components/layouts/MainContent';
// eslint-disable-next-line
import { createBrowserHistory } from 'history';
// eslint-disable-next-line
import { Router } from 'react-router';
// eslint-disable-next-line
import Routes from './Router';

export const history = createBrowserHistory();

function App() {
  return (
    <>
      <Router history={history}>
        <MenuAppBar />
        <MainContent>
          <Routes />
        </MainContent>
      </Router>
    </>
  );
}

export default App;
