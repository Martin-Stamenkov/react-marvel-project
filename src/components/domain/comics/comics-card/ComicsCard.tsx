import React, { useMemo } from 'react';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Button,
  CardActions,
} from '@material-ui/core';
import { history } from 'app/App';
import { fetchComicsById, fetchComicsByIdSuccess } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      maxWidth: 250,
      boxShadow: '3px  3px  5px  grey',
    },
    root: {
      marginTop: 30,
    },
  });
});

export default function ComicsCard({ data }: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const comics = useSelector((state: any) => state.comics?.results);

  const currentComics = useMemo(
    () => comics && comics.find((x: any) => x.id === data.id),
    [comics]
  );

  const handleClick = () => {
    dispatch(fetchComicsByIdSuccess(currentComics));
    currentComics && dispatch(fetchComicsById(currentComics.id));
    history.push('/my-comics');
  };

  return (
    <>
      <Grid className={classes.root} item>
        <Card className={classes.card}>
          <CardContent>
            <Typography align="center" gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="center"
            >
              comics
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            alt="avatar"
            image={`${data.thumbnail!.path}.${data.thumbnail!.extension}`}
            title="avatar"
          />
          <CardActions>
            <div>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => handleClick()}
              >
                Details
              </Button>
            </div>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
