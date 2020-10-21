import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { history } from 'app/App';
import CloseIcon from '@material-ui/icons/Close';
import { useParams } from 'react-router-dom';
import { CharacterDetails } from '../character-details/CharacterDetails';
import { CharactersComics } from '../character-details-comics/CharactersComics';
import { CharacterEvents } from '../character-details-events/CharacterEvents';
import { CharacterSeries } from '../character-details-series/CharacterSeries';

const DetailsSummary = () => {
  const [state, setState] = useState(0);
  const { id } = useParams();

  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setState(value);
  };

  return (
    <>
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
        <Tab icon={<CloseIcon />} onClick={() => history.push('/items')} />
      </Tabs>
      {state === 0 ? <CharacterDetails id={id} /> : null}
      {state === 1 ? <CharactersComics id={id} /> : null}
      {state === 2 ? <CharacterEvents id={id} /> : null}
      {state === 3 ? <CharacterSeries id={id} /> : null}
    </>
  );
};

export default DetailsSummary;
