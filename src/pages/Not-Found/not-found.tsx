import React from 'react';
import { Button, Grid } from '@material-ui/core';
import notFound from 'assets/not-found.jpg';
import { history } from 'app/App';
import { useStyles } from './not-found.styles';

export default function NotFoundPage() {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        className={classes.container}
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <img className={classes.logo} src={notFound} alt="not-found" />
        </Grid>
        <Button
          onClick={() => history.push('/items')}
          className={classes.button}
        >
          back to home
        </Button>
      </Grid>
    </>
  );
}
