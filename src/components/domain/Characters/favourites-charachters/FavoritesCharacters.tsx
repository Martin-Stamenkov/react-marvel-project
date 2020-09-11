import React, { useState, useEffect } from 'react';
import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import { history } from 'app/App';
import { Callback } from 'components/generic/callback/Callback';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import CharacterCard from '../character-card/CharacterCard';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteCharactersSuccess, setToNull } from 'store/actions';

export const FavoritesCharacters = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<any>([]);
  const favoritesId = JSON.parse(localStorage.getItem('favoriteChars') || '[]');
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favoritesCharacters);

  useEffect(() => {
    dispatch(setFavoriteCharactersSuccess());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return () => {
      dispatch(setToNull(favorites));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {favoritesId.length > 0 ? (
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
