import React, { useEffect } from 'react';
import MenuAppBar from 'components/layouts/AppBar';
import MainContent from 'components/layouts/MainContent';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import Routes from './Router';

export const history = createBrowserHistory();

const App = () => {
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
};

export default App;
