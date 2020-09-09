import React from 'react';

import {
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
      marginBottom: 15,
    },
    root: {
      marginTop: 50,
    },
  });
});

export const ApearCharactersCard = ({ data }: any) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography align="center" gutterBottom>
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
