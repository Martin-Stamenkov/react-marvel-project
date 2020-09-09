import React from 'react';
import { Grid } from '@material-ui/core';
import ComicsList from '../comics-list/ComicsList';

export const ComicsSummary = () => {
  return (
    <Grid container justify="center" spacing={3}>
      <ComicsList />
    </Grid>
  );
};
