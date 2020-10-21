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
import { Link } from 'react-router-dom';

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
    links: {
      textDecoration: 'none',
    },
    title: {
      color: 'black',
      '&:hover': {
        color: 'blue',
        fontSize: 17,
      },
    },
  });
});

export const AppearCharactersCard = ({ data }: any) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Link className={classes.links} to={`/details/${data.id}`}>
            <Typography className={classes.title} align="center" gutterBottom>
              {data.name}
            </Typography>
          </Link>
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
