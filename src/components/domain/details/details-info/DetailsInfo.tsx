import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import {
  makeStyles,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Divider,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { database } from 'faker';

const useStyles = makeStyles({
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
});
export const DetailsInfo = ({ data }: any) => {
  const classes = useStyles();

  return (
    <>
      {data && (
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
                image={`${data.thumbnail!.path}.${data.thumbnail!.extension}`}
                title="avatar"
              />
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.title}
                  </Typography>
                </div>
                <Divider />
                {data.description ? (
                  <Typography
                    className={classes.description}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {data.description}
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
                  <span>Last Updated: </span>
                  <Moment format="YYYY/MM/DD">{data.modified}</Moment>
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
