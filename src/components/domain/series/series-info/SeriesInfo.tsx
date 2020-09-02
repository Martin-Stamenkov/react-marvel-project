import React from 'react';
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Grid, Divider } from '@material-ui/core';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { DialogCharacters } from 'components/generic/dialog-characters/DialogCharacters';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 400,
      marginLeft: 22,
    },
    description: {
      marginBottom: 20,
      marginTop: 20,
    },
    divider: {
      marginBottom: 20,
    },
  })
);

export const SeriesInfo = () => {
  const classes = useStyles();
  const theme = useTheme();
  const currentSeries = useSelector((state: any) => state.currentSeries);

  return (
    currentSeries && (
      <Grid
        style={{ display: 'flex', marginTop: 25, marginBottom: 25 }}
        container
      >
        <Grid style={{ display: 'flex' }}>
          <CardMedia
            className={classes.card}
            component="img"
            alt="avatar"
            image={`${currentSeries.thumbnail!.path}.${
              currentSeries.thumbnail!.extension
            }`}
            title="avatar"
          />
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography gutterBottom variant="h5" component="h2">
                {currentSeries.title}
              </Typography>
            </div>
            <Divider />
            {currentSeries.description ? (
              <Typography
                className={classes.description}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {currentSeries.description}
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
              {currentSeries.creators.items.length > 0
                ? currentSeries.creators.items
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
              {currentSeries.startYear}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <span>End Year: </span>
              {currentSeries.endYear}
            </Typography>
            <DialogCharacters props={currentSeries} />
          </CardContent>
        </Grid>
      </Grid>
    )
  );
};
