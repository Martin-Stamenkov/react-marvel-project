import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper } from '@material-ui/core';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import { CharacterDetails } from '../CharacterDetails';
import { history } from 'app/App';
import { CharactersComics } from '../character-details-comics/CharactersComics';

const DetailsSummary = () => {
  const [state, setState] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setState(value);
  };

  return (
    <BrowserRouter>
      <AppBar position="static" color="default">
        <Tabs
          value={state}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="About" />
          <Tab label="Comics" />
          <Tab label="Go Home" onClick={() => history.push('/items')} />
        </Tabs>
        {state === 0 ? <CharacterDetails /> : null}
        {state === 1 ? <CharactersComics /> : null}
      </AppBar>
    </BrowserRouter>
  );
};

export default DetailsSummary;
