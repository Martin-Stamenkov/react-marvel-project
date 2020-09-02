import React from 'react';
import { Grid } from '@material-ui/core';
// import SearchBar from '../../../layouts/search-bar/SearchBar';
import EventsList from '../events-list/EventsList';

export const EventsCardSummary = () => {
  return (
    <Grid container justify="center" spacing={3}>
      {/* <SearchBar /> */}
      <EventsList />
    </Grid>
  );
};
