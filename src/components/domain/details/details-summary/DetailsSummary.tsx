import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter } from 'react-router-dom';
import { CharacterDetails } from '../CharacterDetails';
import { history } from 'app/App';
import { CharactersComics } from '../character-details-comics/CharactersComics';
import { CharacterEvents } from '../character-details-events/CharacterEvents';

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
          <Tab label="Events" />
          <Tab label="Go Home" onClick={() => history.push('/items')} />
        </Tabs>
        {state === 0 ? <CharacterDetails /> : null}
        {state === 1 ? <CharactersComics /> : null}
        {state === 2 ? <CharacterEvents /> : null}
      </AppBar>
    </BrowserRouter>
  );
};

export default DetailsSummary;
