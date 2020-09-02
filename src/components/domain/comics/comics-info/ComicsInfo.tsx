import React, { useMemo } from 'react';
import {
  Grid,
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { DialogCharacters } from 'components/generic/dialog-characters/DialogCharacters';

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    marginLeft: 22,
  },
  description: {
    marginBottom: 20,
    marginTop: 20,
  },
  divider: {
    marginBottom: 20,
  },
});
export const ComicsInfo = () => {
  const classes = useStyles();
  const currentComics = useSelector((state: any) => state.currentComics);

  const writer = useMemo(() => {
    return currentComics.creators.items.length > 0
      ? currentComics.creators.items.find(
          (creator: any) => creator.role === 'writer'
        )
      : 'No available information !';
  }, []);

  return (
    currentComics && (
      <>
        <Grid
          style={{ display: 'flex', marginTop: 25, marginBottom: 25 }}
          container
        >
          <Grid style={{ display: 'flex' }}>
            <CardMedia
              className={classes.card}
              component="img"
              alt="avatar"
              image={`${currentComics.thumbnail!.path}.${
                currentComics.thumbnail!.extension
              }`}
              title="avatar"
            />
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {currentComics.title}
                </Typography>
              </div>
              <Divider />
              {currentComics.description ? (
                <Typography
                  className={classes.description}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {currentComics.description}
                </Typography>
              ) : (
                <Typography
                  className={classes.description}
                  variant="body2"
                  color="textSecondary"
                >
                  Description Missing!{' '}
                </Typography>
              )}
              <Divider className={classes.divider} />
              <Typography gutterBottom color="textSecondary" variant="body2">
                <span>Written by: </span>
                {writer.name}
              </Typography>
              <Typography gutterBottom color="textSecondary" variant="body2">
                <span>Creators: </span>
                {currentComics.creators.items.length > 0
                  ? currentComics.creators.items
                      .map((creator: any) => creator.name)
                      .join(', ')
                  : 'No available information !'}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary">
                <span>Published: </span>
                <Moment format="YYYY/MM/DD">
                  {currentComics.dates[0].date}
                </Moment>
              </Typography>
              <DialogCharacters props={currentComics} />
            </CardContent>
          </Grid>
        </Grid>
      </>
    )
  );
};
