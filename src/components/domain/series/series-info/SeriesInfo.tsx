import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, Divider } from '@material-ui/core';
import { DialogCharacters } from 'components/generic/dialog-characters/DialogCharacters';
import TvSeries from 'assets/television.png';
import { Media } from 'libs/components/media/media';
import { Requests } from 'api/requests';
import { useParams } from 'react-router-dom';
import { hasher, publicKey, ts } from 'api/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: '40%',
      marginLeft: 10,
    },
    description: {
      marginBottom: 20,
      marginTop: 20,
    },
    divider: {
      marginBottom: 20,
      marginTop: 20,
    },
  })
);

export const SeriesInfo = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [seriesInfo, setSeriesInfo] = useState<any>(null);

  useEffect(() => {
    Requests.getSeriesById(id, publicKey, ts, hasher).then((response) =>
      setSeriesInfo(response.data.data.results[0])
    );
  }, [id]);

  return (
    seriesInfo && (
      <Grid
        style={{ display: 'flex', marginTop: '2%', marginBottom: 25 }}
        container
      >
        <Grid style={{ display: 'flex' }}>
          <Media
            className={classes.card}
            alt="avatar"
            image={`${seriesInfo.thumbnail!.path}.${
              seriesInfo.thumbnail!.extension
            }`}
            title="avatar"
          />
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                style={{ height: 50, marginRight: 15 }}
                src={TvSeries}
                alt="Series"
              />

              <Typography gutterBottom variant="h5" component="h2">
                {seriesInfo.title}
              </Typography>
            </div>
            <Divider className={classes.divider} />
            {seriesInfo.description ? (
              <Typography
                className={classes.description}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {seriesInfo.description}
              </Typography>
            ) : (
              <Typography
                className={classes.description}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Description Missing!{' '}
              </Typography>
            )}
            <Divider className={classes.divider} />
            <Typography gutterBottom color="textSecondary" variant="body2">
              <span>Creators: </span>
              {seriesInfo.creators.items.length > 0
                ? seriesInfo.creators.items
                  .map((creator: any) => creator.name)
                  .join(', ')
                : 'No available information !'}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <span>Start Year: </span>
              {seriesInfo.startYear}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <span>End Year: </span>
              {seriesInfo.endYear}
            </Typography>
            <DialogCharacters props={seriesInfo} />
          </CardContent>
        </Grid>
      </Grid>
    )
  );
};
