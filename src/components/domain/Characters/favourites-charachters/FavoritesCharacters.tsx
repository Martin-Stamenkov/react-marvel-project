import React, { useState, useEffect } from 'react';
import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import CharacterCard from '../character-card/CharacterCard';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import { history } from 'app/App';
import { Callback } from 'components/generic/callback/Callback';

export const FavoritesCharacters = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<any>([]);
  const favorites = JSON.parse(localStorage.getItem('favoriteChars') || '[]');
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    favorites.forEach((favoriteId: number) => {
      Requests.getCharacterById(favoriteId, publicKey, ts, hasher).then(
        (response) => {
          setFavoriteCharacters((result: any) => [
            ...result,
            response.data.data.results[0],
          ]);
          setIsLoading(false);
        }
      );
    });
  }, []);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (loading) {
    return <Callback />;
  }
  return (
    <>
      {favorites.length > 0 ? (
        <Grid container spacing={5} justify="center">
          {favoriteCharacters &&
            favoriteCharacters.map((character: any) => (
              <CharacterCard key={character.id} data={character} />
            ))}
        </Grid>
      ) : (
        <Grid>
          <Dialog
            onClose={() => history.push('/items')}
            aria-labelledby="simple-dialog-title"
            open={true}
          >
            <DialogTitle id="simple-dialog-title">
              Come on, choose your favorite heroes!
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                You can choose when you click on 'Add to favorites'. On each
                character`s card.
              </DialogContentText>
            </DialogContent>
          </Dialog>{' '}
        </Grid>
      )}
    </>
  );
};
