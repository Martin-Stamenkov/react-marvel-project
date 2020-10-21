import React, { useEffect } from 'react';
import { history } from 'app/App';
import { Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AlertDialog } from 'libs/components/alert-dialog/alert-dialog';
import CharacterCard from '../character-card/CharacterCard';
import { setFavoriteCharactersSuccess } from '../characters-action/character-action';
import { IHero } from '../character-inferfaces/character-interfaces';

export const FavoritesCharacters = () => {
  const favoritesId = JSON.parse(localStorage.getItem('favoriteChars') || '[]');
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: any) => state.charactersReducer.favoriteCharacters
  );

  useEffect(() => {
    dispatch(setFavoriteCharactersSuccess());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid style={{display: 'flex', marginTop: 30, alignItems: 'center',flexDirection: 'column'}}>
        <Typography  variant="h4">Your Favorite Characters</Typography>
        {favoritesId.length > 0 ? (
          <Grid style={{marginTop: 20}} container spacing={5} justify="center">
            {
              (window.scrollTo(0, 0),
              favorites &&
                favorites.map((character: IHero) => (
                  <CharacterCard key={character.id} data={character} />
                )))
            }
          </Grid>
        ) : (
          <AlertDialog
            title="Come on, choose your favorite heroes!"
            description="You can choose when you click on Heart button. On each character`s card."
            onClose={() => history.push('/items')}
          />
        )}
      </Grid>
    </>
  );
};
