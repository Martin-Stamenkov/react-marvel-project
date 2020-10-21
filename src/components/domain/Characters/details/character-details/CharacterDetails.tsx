import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  makeStyles,
  Grid,
  CardContent,
  Typography,
  Divider,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import { Media } from 'libs/components/media/media';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    marginTop: 25,
    marginBottom: 25,
  },
  card: {
    maxWidth: 450,
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

type Props = {
  id?: number;
};

export const CharacterDetails = (props: Props) => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState<any>([]);
  const [character, setCharacter] = useState<any | never>(null);

  useEffect(() => {
    Requests.getCharacterById(props.id!!, publicKey, ts, hasher).then(
      (response) => {
        setCharacter(response.data.data.results[0]);
      }
    );
  }, [props.id]);

  useEffect(() => {
    character &&
    JSON.parse(localStorage.getItem('favoriteChars') || '[]').indexOf(
      character.id
    ) === -1
      ? setIsFavorite(false)
      : setIsFavorite(true);
  }, [character]);

  return (
    <>
      {character && (
        <>
          <Grid className={classes.container} container>
            <Grid style={{ display: 'flex' }}>
              <Media
                className={classes.card}
                alt="avatar"
                image={`${character.thumbnail!.path}.${
                  character.thumbnail!.extension
                }`}
                title="avatar"
              />
              <CardContent>
                <div className={classes.title}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {character.name}
                  </Typography>
                  <span>
                    <FavoriteIcon
                      color={isFavorite ? 'secondary' : 'inherit'}
                    />
                  </span>
                </div>
                <Divider />
                {character.description ? (
                  <Typography
                    className={classes.description}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {character.description}
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
                  {format(new Date(character.modified), 'dd-MM-yyyy')}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
