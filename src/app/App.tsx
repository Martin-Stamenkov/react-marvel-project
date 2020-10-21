import React from 'react';
import MainContent from 'components/layouts/MainContent';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { MenuAppBar } from './AppBar/MenuAppBar';
import Routes from './Router';

export const history = createBrowserHistory();

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Router history={history}>
          <MenuAppBar />
          <MainContent>
            <Routes />
          </MainContent>
        </Router>
      </BrowserRouter>
    </>
  );
};

export default App;
