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
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeriesByIdSuccess, fetchSeriesById } from 'store/actions';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      maxWidth: 300,
      boxShadow: '3px  3px  5px  grey',
    },
    root: {
      marginTop: 30,
    },
  });
});

export default function SeriesCard({ data }: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const series = useSelector((state: any) => state.series?.results);

  const currentSeries = useMemo(
    () => series && series.find((x: any) => x.id === data.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClick = () => {
    dispatch(fetchSeriesByIdSuccess(currentSeries));
    currentSeries && dispatch(fetchSeriesById(currentSeries.id));
    history.push('/serie');
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
              TV Series
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
                See info series
              </Button>
            </div>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
