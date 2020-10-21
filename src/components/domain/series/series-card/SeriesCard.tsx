import React, { useMemo } from 'react';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Grid,
  makeStyles,
  createStyles,
  Theme,
  CardActions,
} from '@material-ui/core';
import { history } from 'app/App';
import { useSelector } from 'react-redux';
import { GenericButton } from 'libs/components/button/generic-button';
import { Media } from 'libs/components/media/media';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      maxWidth: 250,
      boxShadow: '3px  3px  5px  grey',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    root: {
      margin: 20,
    },
  });
});

export default function SeriesCard({ data }: any) {
  const classes = useStyles();
  const series = useSelector(
    (state: any) => state.seriesReducer.series?.results
  );

  const currentSeries = useMemo(
    () => series && series.find((x: any) => x.id === data.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClick = () => {
    history.push(`/serie/${currentSeries.id}`);
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
          <Media
            style={{
              width: '100%',
              flexGrow: 1,
              objectFit: 'inherit',
            }}
            alt="avatar"
            image={`${data.thumbnail!.path}.${data.thumbnail!.extension}`}
            title="avatar"
          />
          <CardActions>
            <div>
              <GenericButton
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => handleClick()}
              >
                See info series
              </GenericButton>
            </div>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
