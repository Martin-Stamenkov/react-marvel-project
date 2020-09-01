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

const useStyles = makeStyles({
  container: {
    display: 'flex',
    marginTop: 25,
    marginBottom: 25,
  },
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
  title: {
    display: 'flex',
    alignItems: 'center',
    '& span': {
      marginLeft: 20,
    },
  },
});
export const CharacterDetails = () => {
  const characterDetails = useSelector((state: any) => state.character);
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState<any>([]);

  useEffect(() => {
    characterDetails &&
    JSON.parse(localStorage.getItem('favoriteChars') || '[]').indexOf(
      characterDetails.id
    ) === -1
      ? setIsFavorite(false)
      : setIsFavorite(true);
  }, []);

  return (
    <>
      {characterDetails && (
        <>
          <Grid className={classes.container} container>
            <Grid style={{ display: 'flex' }} spacing={5}>
              <CardMedia
                className={classes.card}
                component="img"
                alt="avatar"
                image={`${characterDetails.thumbnail!.path}.${
                  characterDetails.thumbnail!.extension
                }`}
                title="avatar"
              />
              <CardContent>
                <div className={classes.title}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {characterDetails.name}
                  </Typography>
                  <span>
                    <FavoriteIcon
                      color={isFavorite ? 'secondary' : 'inherit'}
                    />
                  </span>
                </div>
                <Divider />
                {characterDetails.description ? (
                  <Typography
                    className={classes.description}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {characterDetails.description}
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
                  <Moment format="YYYY/MM/DD">
                    {characterDetails.modified}
                  </Moment>
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
