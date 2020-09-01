import React from 'react';
import { Grid } from '@material-ui/core';
import { SeriesList } from '../series-list/SeriesList';

export const SeriesCardSummary = () => {
  return (
    <Grid container justify="center" spacing={3}>
      <SeriesList />
    </Grid>
  );
};
