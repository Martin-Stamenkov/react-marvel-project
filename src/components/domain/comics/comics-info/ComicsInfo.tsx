import React from 'react';
import {
  Grid,
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { history } from 'app/App';

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
  return (
    currentComics && (
      <>
        <Grid
          style={{ display: 'flex', marginTop: 25, marginBottom: 25 }}
          container
        >
          <Grid style={{ display: 'flex' }} spacing={5}>
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
                  component="p"
                >
                  Description Missing!{' '}
                </Typography>
              )}
              <Divider className={classes.divider} />
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
                component="p"
              >
                <span>Published: </span>
                <Moment format="YYYY/MM/DD">
                  {currentComics.dates[0].date}
                </Moment>
              </Typography>
              See Creators
              <IconButton onClick={() => history.push('comics-creators')}>
                <NavigateNextIcon fontSize="small" />
              </IconButton>
            </CardContent>
          </Grid>
        </Grid>
      </>
    )
  );
};
