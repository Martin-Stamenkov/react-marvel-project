import React from 'react';
import { Grid } from '@material-ui/core';
import SearchBar from 'components/layouts/search-bar/SearchBar';
import CharactersList from '../characters-list/CharactersList';

export function CharacterCardSummary() {
  return (
    <Grid container justify="center" spacing={3}>
      <SearchBar />
      <CharactersList />
    </Grid>
  );
}
