import React from 'react';
import { Grid } from '@material-ui/core';
import CharactersList from './CharactersList';
import SearchBar from 'components/layouts/search-bar/SearchBar';

function CharacterCardSummary() {
  return (
    <Grid container justify="center" spacing={3}>
      <SearchBar />
      <CharactersList />
    </Grid>
  );
}
export default CharacterCardSummary;
