import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid, Divider } from '@material-ui/core';
import { format } from 'date-fns';
import { DialogCharacters } from 'components/generic/dialog-characters/DialogCharacters';
import Events from 'assets/events.png';
import { publicKey, ts, hasher } from 'api/constants';
import { Requests } from 'api/requests';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: '35%',
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

export const EventsInfo = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [eventInfo, setEventInfo] = useState<any>(null);

  useEffect(() => {
    Requests.getEventById(id, publicKey, ts, hasher).then((response) =>
      setEventInfo(response.data.data.results[0])
    );
  }, [id]);

  return (
    eventInfo && (
      <Grid
        style={{ display: 'flex', marginTop: '2%', marginBottom: 25 }}
        container
      >
        <Grid style={{ display: 'flex' }} spacing={5}>
          <CardMedia
            className={classes.card}
            component="img"
            alt="avatar"
            image={`${eventInfo.thumbnail!.path}.${
              eventInfo.thumbnail!.extension
            }`}
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
                {eventInfo.title}
              </Typography>
            </div>
            <Divider className={classes.divider} />
            {eventInfo.description ? (
              <Typography
                className={classes.description}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {eventInfo.description}
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
              {format(new Date(eventInfo.start), 'dd-MM-yyyy')}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <span>End Date: </span>
              {format(new Date(eventInfo.end), 'dd-MM-yyyy')}
            </Typography>
            <DialogCharacters props={eventInfo} />
          </CardContent>
        </Grid>
      </Grid>
    )
  );
};
