import React from 'react';
import { Grid } from '@material-ui/core';
import CharactersList from './CharactersList';

function CharacterCardSummary() {
  return (
    <Grid container justify="center" spacing={3}>
      <CharactersList />
    </Grid>
  );
}
export default CharacterCardSummary;
