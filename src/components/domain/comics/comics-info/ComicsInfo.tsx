import React, { useEffect, useMemo, useState } from 'react';
import {
  Grid,
  makeStyles,
  CardContent,
  Typography,
  Divider,
} from '@material-ui/core';
import { format } from 'date-fns';
import { DialogCharacters } from 'components/generic/dialog-characters/DialogCharacters';
import Comics from 'assets/comic.png';
import { Media } from 'libs/components/media/media';
import { useParams } from 'react-router-dom';
import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';

const useStyles = makeStyles({
  card: {
    maxWidth: '25%',
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
});
export const ComicsInfo = () => {
  const classes = useStyles();
  const [comicsInfo, setComicsInfo] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    Requests.getComicsById(id, publicKey, ts, hasher).then((response) => {
      setComicsInfo(response.data.data.results[0]);
    });
  }, [id]);

  const writer = useMemo(() => {
    return (
      comicsInfo?.creators.items.length > 0 &&
      comicsInfo.creators.items.find(
        (creator: any) => creator.role === 'writer'
      )
    );
  }, [comicsInfo]);
  return (
    comicsInfo && (
      <>
        <Grid
          style={{ display: 'flex', marginTop: '2%', marginBottom: 25 }}
          container
        >
          <Grid style={{ display: 'flex' }}>
            <Media
              className={classes.card}
              alt="avatar"
              image={`${comicsInfo.thumbnail!.path}.${
                comicsInfo.thumbnail!.extension
              }`}
              title="avatar"
            />
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img style={{ height: 50 }} src={Comics} alt="Comics" />
                <Typography gutterBottom variant="h5" component="h2">
                  {comicsInfo.title}
                </Typography>
              </div>
              <Divider className={classes.divider} />
              {comicsInfo.description ? (
                <Typography
                  className={classes.description}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {comicsInfo.description}
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
                {writer ? writer.name : 'No available information !'}
              </Typography>
              <Typography gutterBottom color="textSecondary" variant="body2">
                <span>Creators: </span>
                {comicsInfo.creators.items.length > 0
                  ? comicsInfo.creators.items
                      .map((creator: any) => creator.name)
                      .join(', ')
                  : 'No available information !'}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary">
                <span>Published: </span>
                {format(new Date(comicsInfo.dates[0].date), 'dd-MM-yyyy')}
              </Typography>
              <DialogCharacters props={comicsInfo} />
            </CardContent>
          </Grid>
        </Grid>
      </>
    )
  );
};
