import React from 'react';
import { Grid } from '@material-ui/core';
import CharactersList from '../characters-list/CharactersList';

export function CharacterCardSummary() {
  return (
    <Grid container justify="center" spacing={3}>
      <CharactersList />
    </Grid>
  );
}
