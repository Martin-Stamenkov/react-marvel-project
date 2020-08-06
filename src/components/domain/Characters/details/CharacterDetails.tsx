import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import ComicsCard from 'components/domain/Characters/comics-card/ComicsCard';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
  },
});

export const CharacterDetails = () => {
  const characterDetails = useSelector((state: any) => state.character);
  const classes = useStyles();
  const [comicsRequests, setComicsRequests] = useState<any>([]);

  useEffect(() => {
    characterDetails &&
      characterDetails.comics.items.forEach((currentComics: any) => {
        const comicsId = currentComics.resourceURI.slice(-5);
        Requests.getComicsById(comicsId, publicKey, ts, hasher).then(
          (response) => {
            setComicsRequests((result: any) => [
              ...result,
              response.data.data.results[0],
            ]);
          }
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {characterDetails && (
        <>
          <Grid>
            <Grid style={{ display: 'flex' }} justify="center" item>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="avatar"
                    image={`${characterDetails.thumbnail!.path}.${
                      characterDetails.thumbnail!.extension
                    }`}
                    title="avatar"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {characterDetails.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {characterDetails.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </Card>
            </Grid>
            <Grid container spacing={5} justify="center">
              {comicsRequests &&
                comicsRequests.map((currentComics: any) => (
                  <ComicsCard key={currentComics.id} data={currentComics} />
                ))}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
