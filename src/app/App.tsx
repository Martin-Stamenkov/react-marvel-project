import React, { Component } from 'react';
import MenuAppBar from 'components/layouts/AppBar';
import MainContent from 'components/layouts/MainContent';
import SignUp from 'pages/SignUp';
import logo from './logo.svg';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import Routes from './Router';
import CharacterCard from 'components/domain/Characters';

const history = createBrowserHistory();

function App() {
  return (
    <>
      <Router history={history}>
        <MenuAppBar />
        <MainContent>
          <Routes />
        </MainContent>
        <CharacterCard />
      </Router>
    </>
  );
}

export default App;
