import React, { useEffect } from 'react';

import { history } from 'app/App';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Backdrop,
} from '@material-ui/core';
import CharacterCard from '../character-card/CharacterCard';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteCharactersSuccess } from 'store/actions';
import background from 'assets/9.jpg';

export const FavoritesCharacters = () => {
  const favoritesId = JSON.parse(localStorage.getItem('favoriteChars') || '[]');
  const dispatch = useDispatch();
  let favorites = useSelector((state: any) => state.favoriteCharacters);

  useEffect(() => {
    dispatch(setFavoriteCharactersSuccess());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        style={{
          background: `url(${background}) no-repeat center fixed`,
          backgroundSize: '1450px 740px',
          paddingBottom: 15,
        }}
      >
        {favoritesId.length > 0 ? (
          <Grid container spacing={5} justify="center">
            {
              (window.scrollTo(0, 0),
              favorites &&
                favorites.map((character: any) => (
                  <CharacterCard key={character.id} data={character} />
                )))
            }
          </Grid>
        ) : (
          <Grid>
            <Backdrop
              style={{
                background: `url(${background}) no-repeat center fixed`,
                backgroundSize: '1450px 740px',
                paddingBottom: 15,
              }}
              open={true}
            >
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
            </Backdrop>
          </Grid>
        )}
      </div>
    </>
  );
};
