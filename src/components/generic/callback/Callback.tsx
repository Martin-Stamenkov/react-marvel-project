import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { SpinnerStyles } from './callback.styles';

export const Callback = () => {
  const classes = SpinnerStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
      <p>Loading</p>
    </div>
  );
};
