import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid, Divider } from '@material-ui/core';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { DialogCharacters } from 'components/generic/dialog-characters/DialogCharacters';
import Events from 'assets/events.png';

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
      marginTop: 20,
    },
  })
);

export const EventsInfo = () => {
  const classes = useStyles();
  const event = useSelector((state: any) => state.event);
  return (
    event && (
      <Grid
        style={{ display: 'flex', marginTop: 25, marginBottom: 25 }}
        container
      >
        <Grid style={{ display: 'flex' }} spacing={5}>
          <CardMedia
            className={classes.card}
            component="img"
            alt="avatar"
            image={`${event.thumbnail!.path}.${event.thumbnail!.extension}`}
            title="avatar"
          />
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <img
                style={{ height: 50, marginRight: 15 }}
                src={Events}
                alt="Events"
              />
              <Typography gutterBottom variant="h5" component="h2">
                {event.title}
              </Typography>
            </div>
            <Divider className={classes.divider} />
            {event.description ? (
              <Typography
                className={classes.description}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {event.description}
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
              <span>Start Date: </span>
              <Moment format="YYYY/MM/DD">{event.start}</Moment>
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <span>End Date: </span>
              <Moment format="YYYY/MM/DD">{event.end}</Moment>
            </Typography>
            <DialogCharacters props={event} />
          </CardContent>
        </Grid>
      </Grid>
    )
  );
};
