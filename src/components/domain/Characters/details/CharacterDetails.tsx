import React, { useState, useEffect } from 'react';
import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import ComicsCard from 'components/domain/comics/comics-card/ComicsCard';
import {
  makeStyles,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
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
  const [isFavorite, setIsFavorite] = useState<any>([]);

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
          <Grid>
            <Grid style={{ display: 'flex' }} justify="center" container>
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
                  <FavoriteIcon color={isFavorite ? 'secondary' : 'inherit'} />
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
