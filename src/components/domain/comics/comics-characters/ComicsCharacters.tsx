import React, { useEffect, useMemo, useState } from 'react';
import { Requests } from '../../../../api/requests';
import { publicKey, ts, hasher } from '../../../../api/constants';
import {
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      maxWidth: 250,
      marginLeft: 15,
    },
    root: {
      marginTop: 50,
    },
  });
});

export const ComicsCharacters = ({ data }: any) => {
  const classes = useStyles();
  const comics = useSelector((state: any) => state.comics?.results);

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="avatar"
          image={`${data.thumbnail!.path}.${data.thumbnail!.extension}`}
          title="avatar"
        />
      </Card>
    </>
  );
};
