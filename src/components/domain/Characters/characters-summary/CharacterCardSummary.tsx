import React from 'react';
import { Grid } from '@material-ui/core';
import SearchBar from 'components/layouts/search-bar/SearchBar';
import CharactersList from '../characters-list/CharactersList';
import background from 'assets/4.jpg';

export function CharacterCardSummary() {
  return (
    <Grid container justify="center" spacing={3}>
      <CharactersList />
    </Grid>
  );
}
