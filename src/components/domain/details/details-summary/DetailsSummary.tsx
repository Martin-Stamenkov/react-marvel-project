import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BrowserRouter } from 'react-router-dom';
import { CharacterDetails } from '../character-details/CharacterDetails';
import { history } from 'app/App';
import { CharactersComics } from '../character-details-comics/CharactersComics';
import { CharacterEvents } from '../character-details-events/CharacterEvents';
import { CharacterSeries } from '../character-details-series/CharacterSeries';
import CloseIcon from '@material-ui/icons/Close';

const DetailsSummary = () => {
  const [state, setState] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setState(value);
  };

  return (
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
        <Tab label="Series" />
        <Tab icon={<CloseIcon />} href={'/items'} />
      </Tabs>
      {state === 0 ? <CharacterDetails /> : null}
      {state === 1 ? <CharactersComics /> : null}
      {state === 2 ? <CharacterEvents /> : null}
      {state === 3 ? <CharacterSeries /> : null}
    </AppBar>
  );
};

export default DetailsSummary;
