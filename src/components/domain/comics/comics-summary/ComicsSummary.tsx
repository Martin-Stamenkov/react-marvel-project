import React from 'react';
import SearchBar from 'components/layouts/search-bar/SearchBar';
import ComicsList from '../comics-list/ComicsList';
import { Grid } from '@material-ui/core';

export const ComicsSummary = () => {
  return (
    <Grid container justify="center" spacing={3}>
      <SearchBar />
      <ComicsList />
    </Grid>
  );
};
